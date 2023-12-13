import { Room } from "../types";
import { ResultKind } from "../constants";
import { getAttackedKing } from "../attacks";
import { checkMove } from "../moves";
import { getOpponentColor } from ".";

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

export { clearSelection, swapTurn, checkAttacks, checkEndGame };
