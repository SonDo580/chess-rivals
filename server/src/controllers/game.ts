import { Server, Socket } from "socket.io";

import { Player, PromotePieceSymbol, Room, SquarePos } from "../types";
import { defaultEnPassantInfo } from "../constants/default";
import { getMoves, makeMove, updateBoard } from "../moves";
import { getPlayers, searchRoomById } from "../utils/room";
import { getPiece, posString, shouldReset50Move } from "../utils";
import { updateCastlingRight } from "../utils/king";
import { checkEnPassant, needPromotion } from "../utils/pawn";
import {
  checkAttacks,
  checkEndGame,
  clearSelection,
  swapTurn,
} from "../utils/game";

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

// ===== REFACTOR selectSquareHandler =====

/* First click: highlight the valid moves
   Second click: make a valid move, or just clear the highlighting */
const selectSquareHandler2 =
  (socket: Socket, io: Server) =>
  (roomId: string, row: number, col: number) => {
    // Find the room
    const room = searchRoomById(roomId);

    // Check if the game has already ended
    if (isGameEnded(room)) {
      return;
    }

    const position = posString(row, col); // string format: row-col

    // (second click) there is a current selection and the move is valid
    if (room.currentSquare && room.moves.includes(position)) {
      // Make a move & update room state
      processMove(room, position);

      notifyPlayers(socket, io, room);
      return;
    }

    // (first click) Handle selecting a new piece

    if (!isSquareValidForSelection(room, row, col)) {
      clearSelection(room); // clear highlighting
      notifyPlayers(socket, io, room);
      return;
    }

    // Set selected square
    room.currentSquare = position;

    // Update valid moves
    room.moves = getValidMoves(room, row, col);

    // Update highlighting
    room.squaresToHighlight = [position, ...room.moves];

    notifyPlayers(socket, io, room);
  };

enum EventName {
  ROOM_UPDATED = "roomUpdated",
  // ...
}

// Notify players in the room
function notifyPlayers(socket: Socket, io: Server, room: Room) {
  // notify current player
  socket.emit(EventName.ROOM_UPDATED, room);

  // notify the other player if they joined
  const { otherPlayer } = getPlayers(room, socket.id);
  if (otherPlayer) {
    io.to(otherPlayer.id).emit(EventName.ROOM_UPDATED, room);
  }
}

// Check if the game is already ended
function isGameEnded(room: Room) {
  return room.result.kind !== undefined;
}

// Make a move & update room state
function processMove(room: Room, position: SquarePos) {
  // Extract the room information
  const { turn, board, enPassant, castlingRights } = room;
  const currentSquare = room.currentSquare as SquarePos;

  // Make the move -> update board state
  room.board = makeMove(
    board,
    currentSquare,
    position,
    enPassant,
    castlingRights[turn]
  );

  // Handle highlighting state
  room.lastMove = position;
  clearSelection(room);

  // The current king should not be in danger now. Reset 'check' state
  // -> the function name is not good
  checkAttacks(room);

  // Update castling right for current player
  updateCastlingRights(room, currentSquare);

  // Update en passant state
  updateEnPassant(room, currentSquare, position);

  // Check pawn promotion availability & update state.
  // Return early (don't swap turn)
  if (needPromotion(room.board, position, turn)) {
    room.needPromotion = true;
    return;
  }

  // Update state for 50-move rule
  update50MoveState(room, currentSquare, position);

  // Swap turn
  swapTurn(room);

  // check if the opponent king is under attack
  // & update the room's attacked king -> the name 'check' is not good
  checkAttacks(room);

  // Check for end game
  // & update result if needed -> the name 'check' is not good
  checkEndGame(room);
}

// Update castling right for current player
function updateCastlingRights(room: Room, currentSquare: SquarePos) {
  const { turn, board, castlingRights } = room;
  const castlingRight = castlingRights[turn];

  // Skip if castling right has been removed for both side (king & queen)
  if (!castlingRight.q && !castlingRight.k) {
    return;
  }

  room.castlingRights[turn] = updateCastlingRight(
    board,
    currentSquare,
    castlingRight
  );
}

// Update en passant state
function updateEnPassant(
  room: Room,
  currentSquare: SquarePos,
  position: SquarePos
) {
  // Reset after making a valid move
  if (room.enPassant.pieces.length > 0) {
    room.enPassant = defaultEnPassantInfo;
    return;
  }

  // Check & update en passant state
  // -> the function name is not good
  room.enPassant = checkEnPassant(
    room.board,
    currentSquare,
    position,
    room.turn
  );
}

// Update state for 50-Move rule
function update50MoveState(
  room: Room,
  currentSquare: SquarePos,
  position: SquarePos
) {
  // Reset if there are pawn moves and capturing
  if (shouldReset50Move(room.board, currentSquare, position)) {
    room.fiftyMoveCount = 0;
    return;
  }
  room.fiftyMoveCount++;
}

// Check if selected square is valid (first click)
function isSquareValidForSelection(room: Room, row: number, col: number) {
  const square = room.board[row][col];

  // Select an empty square
  if (!square) {
    return false;
  }

  // Select the same piece twice
  if (room.currentSquare === posString(row, col)) {
    return false;
  }

  // Select the opponent piece
  const [pieceColor] = square;
  return pieceColor === room.turn;
}

// Get valid moves for the selected square
function getValidMoves(room: Room, row: number, col: number) {
  const { board, turn, enPassant, castlingRights } = room;
  return getMoves(board, row, col, turn, enPassant, castlingRights[turn]);
}

export { selectSquareHandler, promotionHandler };
