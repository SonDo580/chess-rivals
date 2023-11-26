import { getOpponentColor, onBoard } from ".";
import { DIRECTIONS } from "../constants/directions";
import { Board, Color } from "../types";

// Check if a square is next to the opponent king
const nearOpponentKing = (
  board: Board,
  row: number,
  col: number,
  turn: Color
) => {
  const opponentColor = getOpponentColor(turn);
  const opponentKing = `${opponentColor}k`;

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

export { nearOpponentKing };
