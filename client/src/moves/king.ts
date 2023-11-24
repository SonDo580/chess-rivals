import { Board, Color, SquarePos } from "../types";
import { onBoard } from "../utils";

// TODO:
// Check
// Castling

// row and col offsets
const directions: [number, number][] = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const getKingMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color
): SquarePos[] => {
  const moves: SquarePos[] = [];

  // Check all surrouding squares
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

export { getKingMoves };
