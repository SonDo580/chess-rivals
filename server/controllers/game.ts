import { Server, Socket } from "socket.io";

import { Player, PromotePieceSymbol, Room, SquarePos } from "../types";
import { defaultEnPassantInfo } from "../constants/default";
import { getPlayers, searchRoomById } from "../utils/room";
import {
  getOpponentColor,
  getPiece,
  posString,
  shouldReset50Move,
} from "../utils";
import { updateCastlingRight } from "../utils/king";
import { checkEnPassant, needPromotion } from "../utils/pawn";
import { checkMove, getMoves, makeMove, updateBoard } from "../moves";
import { getAttackedKing } from "../attacks";
import { ResultKind } from "../constants";

const clearSelection = (room: Room) => {
  room.currentSquare = "";
  room.moves = [];
  room.squaresToHighlight = [];
};

const swapTurn = (room: Room) => {
  room.turn = getOpponentColor(room.turn);
};

const checkAttacks = (room: Room) => {
  const { board, turn } = room;
  room.check.king = getAttackedKing(board, turn);
};

const checkEndGame = (room: Room) => {
  const { board, turn, enPassant, castlingRights, fiftyMoveCount } = room;
  const canMove = checkMove(board, turn, enPassant, castlingRights[turn]);
  if (canMove) {
    // In 50-move rule: 1 move = 2 turn
    if (fiftyMoveCount === 100) {
      room.result.kind = ResultKind.DRAW;
    }
    return;
  }

  // No moves available
  if (!room.check.king) {
    room.result.kind = ResultKind.STALEMATE;
  } else {
    room.result.kind = ResultKind.CHECKMATE;
    room.result.winner = getOpponentColor(turn);
  }
};

const noticePlayers = (
  socket: Socket,
  io: Server,
  room: Room,
  otherPlayer?: Player
) => {
  socket.emit("roomUpdated", room);
  if (otherPlayer) {
    io.to(otherPlayer.id).emit("roomUpdated", room);
  }
};

const selectSquareHandler =
  (socket: Socket, io: Server) =>
  (roomId: string, row: number, col: number) => {
    // Find the room
    const room = searchRoomById(roomId);

    // Check if the game already ended
    if (room.result.kind) {
      return;
    }

    const { turn, board, currentSquare, moves, enPassant } = room;
    const castlingRight = room.castlingRights[turn];

    // Get position string for selected square
    const pos = posString(row, col);

    // Get players in the room
    const { otherPlayer } = getPlayers(room, socket.id);

    // Make a valid move
    if (currentSquare && moves.includes(pos)) {
      const newBoard = makeMove(
        board,
        currentSquare,
        pos,
        enPassant,
        castlingRight
      );
      room.board = newBoard;
      room.lastMove = pos;
      clearSelection(room);

      // The current king should not be in danger now. Reset 'check'
      checkAttacks(room);

      // Update castling right for current player
      // Skip if castling right has been removed for both side
      if (castlingRight.q || castlingRight.k) {
        room.castlingRights[turn] = updateCastlingRight(
          board,
          currentSquare,
          castlingRight
        );
      }

      // Check for en passant. Reset after making a move
      if (enPassant.pieces.length > 0) {
        room.enPassant = defaultEnPassantInfo;
      } else {
        room.enPassant = checkEnPassant(board, currentSquare, pos, turn);
      }

      // Check for pawn promotion
      if (needPromotion(newBoard, pos, turn)) {
        room.needPromotion = true;
        // Notice both players
        noticePlayers(socket, io, room, otherPlayer);
        return;
      }

      // Check for pawn move and capturing (for 50-move rule)
      if (shouldReset50Move(board, currentSquare, pos)) {
        room.fiftyMoveCount = 0;
      } else {
        room.fiftyMoveCount++;
      }

      // Swap turn and check if the opponent king is under attack
      swapTurn(room);
      checkAttacks(room);

      // Check for end game
      checkEndGame(room);

      // Notice both players
      noticePlayers(socket, io, room, otherPlayer);
      return;
    }

    // Must not select an empty square
    const square = board[row][col];
    if (!square) {
      if (currentSquare) {
        clearSelection(room);
      }
      // Notice both players
      noticePlayers(socket, io, room, otherPlayer);
      return;
    }

    // Must select pieces with correct color
    const [pieceColor] = square;
    if (pieceColor !== turn) {
      if (currentSquare) {
        clearSelection(room);
      }
      // Notice both players
      noticePlayers(socket, io, room, otherPlayer);
      return;
    }

    // Click the same piece twice
    if (currentSquare === pos) {
      clearSelection(room);
      // Notice both players
      noticePlayers(socket, io, room, otherPlayer);
      return;
    }

    room.currentSquare = pos;

    // Get valid moves for the piece
    const validMoves = getMoves(
      board,
      row,
      col,
      turn,
      enPassant,
      room.castlingRights[turn]
    );
    room.moves = validMoves;

    // Highlight current square and valid moves
    room.squaresToHighlight = [pos, ...validMoves];

    // Notice both players
    noticePlayers(socket, io, room, otherPlayer);
  };

const promotionHandler =
  (socket: Socket, io: Server) =>
  (roomId: string, piece: PromotePieceSymbol) => {
    // Find the room
    const room = searchRoomById(roomId);
    // Get players in the room
    const { otherPlayer } = getPlayers(room, socket.id);

    const { board, lastMove, turn } = room;
    const promotedPiece = getPiece(turn, piece);
    const newBoard = updateBoard(board, lastMove as SquarePos, promotedPiece);

    room.board = newBoard;
    room.needPromotion = false;

    // Swap turn and check if the opponent king is under attack
    swapTurn(room);
    checkAttacks(room);

    // Check for end game
    checkEndGame(room);

    // Notice both players
    noticePlayers(socket, io, room, otherPlayer);
  };

export { selectSquareHandler, promotionHandler };
