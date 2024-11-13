import { Board } from "../types";
import { PieceSymbol, Color } from "../constants";
import { getPiece, validCol, validRow } from "../utils";

// Check for pawn attacks
// row, col: current king position
const isAttackedByPawn = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
) => {
  const rowOffset = opponentColor === Color.WHITE ? 1 : -1;
  const destRow = row + rowOffset;

  if (!validRow(destRow)) {
    return false;
  }

  for (const colOffset of [-1, 1]) {
    const destCol = col + colOffset;
    if (!validCol(destCol)) {
      continue;
    }

    if (board[destRow][destCol] === getPiece(opponentColor, PieceSymbol.PAWN)) {
      return true;
    }
  }

  return false;
};

export { isAttackedByPawn };
