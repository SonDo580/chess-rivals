import { PieceSymbol, Color } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { Board, SquarePos } from "../types";
import { getPiece, onBoard, posString } from "../utils";

// Check for knight attacks
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

// Get knight attacks
const getKnightAttacks = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
): SquarePos[] => {
  const attacks: SquarePos[] = [];

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
      attacks.push(posString(currentRow, currentCol));
    }
  }

  return attacks;
};

export { isAttackedByKnight, getKnightAttacks };
