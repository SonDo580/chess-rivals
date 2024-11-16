import { Server, Socket } from "socket.io";

import { PromotePieceSymbol, Room, SquarePos } from "@/types";
import { defaultEnPassantInfo } from "@/constants/default";
import { getMoves, makeMove, updateBoard } from "@/moves";
import { searchRoomById } from "@/utils/room";
import { getPiece, posString, shouldReset50Move } from "@/utils";
import { updateCastlingRight } from "@/utils/king";
import { checkEnPassant, needPromotion } from "@/utils/pawn";
import {
  checkAttacks,
  checkEndGame,
  clearSelection,
  swapTurn,
} from "@/utils/game";
import { ServerEventName } from "@/constants/event";
import { NotificationService } from "@/services/notification.service";

export class GameController {
  private readonly notificationService: NotificationService;

  constructor(socket: Socket, io: Server) {
    this.notificationService = new NotificationService(socket, io);
  }

  /**
   * - first click: highlight the valid moves
   * - second click: make a valid move or clear highlight
   */
  public selectSquareHandler(roomId: string, row: number, col: number) {
    const room = searchRoomById(roomId);

    // Check if the game has already ended
    if (this.isGameEnded(room)) {
      return;
    }

    const position = posString(row, col);

    // Make a move if there's a current selection and the move is valid
    if (room.currentSquare && room.moves.includes(position)) {
      this.processMove(room, position);
      this.notifyPlayers(room);
      return;
    }

    // Handle selecting a new piece
    if (!this.isSquareValidForSelection(room, row, col)) {
      clearSelection(room);
      this.notifyPlayers(room);
      return;
    }

    room.currentSquare = position;
    room.moves = this.getValidMoves(room, row, col);
    room.squaresToHighlight = [position, ...room.moves];

    // Notify both players
    this.notifyPlayers(room);
  }

  public promotionHandler(roomId: string, piece: PromotePieceSymbol) {
    const room = searchRoomById(roomId);

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

    this.notifyPlayers(room);
  }

  /* Notify both players with ROOM_UPDATED event */
  private notifyPlayers(room: Room) {
    this.notificationService.notifyPlayers({
      eventName: ServerEventName.ROOM_UPDATED,
      otherEventName: ServerEventName.ROOM_UPDATED,
      data: room,
      otherData: room,
      room,
    });
  }

  /* Check if the game is already ended */
  private isGameEnded(room: Room) {
    return !!room.result.kind;
  }

  /* Make a move & update room state */
  private processMove(room: Room, position: SquarePos) {
    const { turn, board, enPassant, castlingRights } = room;
    const currentSquare = room.currentSquare as SquarePos;

    // Update board state after making thee move
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
    checkAttacks(room);

    this.updateCastlingRights(room, currentSquare);
    this.updateEnPassant(room, currentSquare, position);

    // Handle pawn promotion
    if (needPromotion(room.board, position, turn)) {
      room.needPromotion = true;
      return;
    }

    this.update50MoveState(room, currentSquare, position);

    swapTurn(room);

    // check if the opponent king is under attack & update the room's attacked king
    checkAttacks(room);

    // Check for end game & update result if needed
    checkEndGame(room);
  }

  /* Update castling right for current player */
  private updateCastlingRights(room: Room, currentSquare: SquarePos) {
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

  /* Update en-passant state */
  private updateEnPassant(
    room: Room,
    currentSquare: SquarePos,
    position: SquarePos
  ) {
    // Reset after making a valid move
    if (room.enPassant.pieces.length > 0) {
      room.enPassant = defaultEnPassantInfo;
      return;
    }

    // Check & update en-passant state
    room.enPassant = checkEnPassant(
      room.board,
      currentSquare,
      position,
      room.turn
    );
  }

  /* Update state for 50-Move rule */
  private update50MoveState(
    room: Room,
    currentSquare: SquarePos,
    position: SquarePos
  ) {
    if (shouldReset50Move(room.board, currentSquare, position)) {
      room.fiftyMoveCount = 0;
      return;
    }
    room.fiftyMoveCount++;
  }

  /* Check if selected square is valid (first click) */
  private isSquareValidForSelection(room: Room, row: number, col: number) {
    const square = room.board[row][col];

    // Select an empty square
    if (!square) {
      return false;
    }

    // Select the same piece twice
    if (room.currentSquare === posString(row, col)) {
      return false;
    }

    // Select the piece with correct color
    const [pieceColor] = square;
    return pieceColor === room.turn;
  }

  /* Get valid moves for the selected square */
  private getValidMoves(room: Room, row: number, col: number) {
    const { board, turn, enPassant, castlingRights } = room;
    return getMoves(board, row, col, turn, enPassant, castlingRights[turn]);
  }
}
