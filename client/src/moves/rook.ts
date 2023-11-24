import { Board, Color } from "../types";
import { onBoard } from "../utils";

// TODO:
// Check

// row and col offsets from current position
const directions: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const getRookMoves = (board: Board, row: number, col: number, turn: Color) => {
  const moves: string[] = [];

  for (const direction of directions) {
    let currentRow = row;
    let currentCol = col;

    // Keep checking in 1 direction
    // eslint-disable-next-line no-constant-condition
    while (true) {
      currentRow = currentRow + direction[0];
      currentCol = currentCol + direction[1];

      // Jump out of the board
      if (!onBoard(currentRow, currentCol)) {
        break;
      }

      const square = board[currentRow][currentCol];
      // Add empty squares
      if (!square) {
        moves.push(`${currentRow}-${currentCol}`);
        continue;
      }

      // Stop if hit a same-color piece
      // Add the move and stop if hit an opponent's piece
      const [pieceColor] = square;
      if (pieceColor !== turn) {
        moves.push(`${currentRow}-${currentCol}`);
      }
      break;
    }
  }

  return moves;
};

export { getRookMoves };
