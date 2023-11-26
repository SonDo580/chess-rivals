import { KNIGHT } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { Board, Color, SquarePos } from "../types";
import { onBoard, posString } from "../utils";

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

    if (board[currentRow][currentCol] === `${opponentColor}${KNIGHT}`) {
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

    if (board[currentRow][currentCol] === `${opponentColor}${KNIGHT}`) {
      attacks.push(posString(currentRow, currentCol));
    }
  }

  return attacks;
};

export { isAttackedByKnight, getKnightAttacks };
