import { Board } from "../types";
import { PieceSymbol, Color } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { getPiece, onBoard } from "../utils";

// Check for knight attacks
// row, col: current king position
const isAttackedByKnight = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
) => {
  for (const direction of DIRECTIONS.LSHAPE) {
    const currentRow = row + direction[0];
    const currentCol = col + direction[1];
    if (!onBoard(currentRow, currentCol)) {
      continue;
    }

    if (
      board[currentRow][currentCol] ===
      getPiece(opponentColor, PieceSymbol.KNIGHT)
    ) {
      return true;
    }
  }

  return false;
};

export { isAttackedByKnight };
