import { Board, Color, SquarePos } from "../types";
import { onBoard } from "../utils";

// TODO: Check

// row and col offsets from current position
const directions: [number, number][] = [
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [-2, -1],
  [-2, 1],
  [2, -1],
  [2, 1],
];

const getKnightMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color
): SquarePos[] => {
  const moves: SquarePos[] = [];

  for (const direction of directions) {
    const destRow = row + direction[0];
    const destCol = col + direction[1];

    // Jump out of the board
    if (!onBoard(destRow, destCol)) {
      continue;
    }

    // Hit a same-color piece
    const square = board[destRow][destCol];
    const [pieceColor] = square;
    if (pieceColor === turn) {
      continue;
    }

    // Add the move
    moves.push(`${destRow}-${destCol}`);
  }

  return moves;
};

export { getKnightMoves };
