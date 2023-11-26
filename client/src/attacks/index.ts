import { KING } from "../constants";
import { Board, Color, King, SquarePos } from "../types";
import { getOpponentColor, getPiece, posParse } from "../utils";
import { getKingPos } from "../utils/king";

import { getKnightAttacks, isAttackedByKnight } from "./knight";
import { getPawnAttacks, isAttackedByPawn } from "./pawn";

// Get the king that is being attacked
const getAttackedKing = (board: Board, turn: Color): King | null => {
  const currentKing = getPiece(turn, KING) as King;
  const kingPos = getKingPos(board, turn) as SquarePos;
  const [row, col] = posParse(kingPos);
  const opponentColor = getOpponentColor(turn);

  const isAttacked =
    isAttackedByKnight(board, row, col, opponentColor) ||
    isAttackedByPawn(board, row, col, opponentColor);

  return isAttacked ? currentKing : null;
};

// Get all attacks from opponent
const getAttacks = (board: Board, turn: Color): SquarePos[] => {
  const kingPos = getKingPos(board, turn) as SquarePos;
  const [row, col] = posParse(kingPos);
  const opponentColor = getOpponentColor(turn);

  return [
    ...getKnightAttacks(board, row, col, opponentColor),
    ...getPawnAttacks(board, row, col, opponentColor),
  ];
};

export { getAttackedKing, getAttacks };
