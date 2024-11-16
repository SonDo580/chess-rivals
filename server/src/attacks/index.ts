import { Board, King, SquarePos } from "../types";
import { PieceSymbol, Color } from "../constants";
import { getOpponentColor, getPiece, posParse } from "../utils";
import { getKingPos } from "../utils/king";

import { isAttackedByKnight } from "./knight";
import { isAttackedByPawn } from "./pawn";
import { isAttackedByBishopRookQueen } from "./bishop-rook-queen";

// Get the king that is being attacked
const getAttackedKing = (board: Board, turn: Color): King | null => {
  const currentKing = getPiece(turn, PieceSymbol.KING);
  const kingPos = getKingPos(board, turn) as SquarePos;
  const [row, col] = posParse(kingPos);
  const opponentColor = getOpponentColor(turn);

  const isAttacked =
    isAttackedByBishopRookQueen(board, row, col, opponentColor) ||
    isAttackedByKnight(board, row, col, opponentColor) ||
    isAttackedByPawn(board, row, col, opponentColor);

  return isAttacked ? currentKing : null;
};

export { getAttackedKing };
