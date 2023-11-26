import { Board, Color } from "../types";
import { DIRECTIONS } from "../constants/directions";
import { KING } from "../constants";
import { getOpponentColor, getPiece, onBoard, posString } from ".";

// Check if a square is next to the opponent king
const nearOpponentKing = (
  board: Board,
  row: number,
  col: number,
  turn: Color
) => {
  const opponentColor = getOpponentColor(turn);
  const opponentKing = getPiece(opponentColor, KING);

  for (const direction of DIRECTIONS.STAR) {
    const currentRow = row + direction[0];
    const currentCol = col + direction[1];
    if (!onBoard(currentRow, currentCol)) {
      continue;
    }

    if (board[currentRow][currentCol] === opponentKing) {
      return true;
    }
  }

  return false;
};

// Get the king position
const getKingPos = (board: Board, turn: Color) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === getPiece(turn, KING)) {
        return posString(i, j);
      }
    }
  }
};

export { nearOpponentKing, getKingPos };
