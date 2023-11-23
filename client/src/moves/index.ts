import { KNIGHT } from "../constants";
import { Board, Color } from "../types";
import { getKnightMoves } from "./knight";

const getMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color
): string[] => {
  // Empty square
  const square = board[row][col];
  if (!square) {
    return [];
  }

  // Incorrect turn
  const [pieceColor, pieceSymbol] = square;
  if (pieceColor !== turn) {
    return [];
  }

  switch (pieceSymbol) {
    case KNIGHT:
      return getKnightMoves(board, row, col, turn);
    default:
      return [];
  }
};

export { getMoves };
