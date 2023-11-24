import { WHITE } from "../constants";
import { Board, Color } from "../types";
import { validCol, validRow } from "../utils";

// TODO:
// Check
// En passant
// Promotion

const getPawnMoves = (board: Board, row: number, col: number, turn: Color) => {
  const moves: string[] = [];
  const startRow = turn === WHITE ? 6 : 1;
  const rowOffset = turn === WHITE ? -1 : 1;

  const destRow = row + rowOffset;
  if (!validRow(destRow)) {
    return [];
  }

  // Check if the square right ahead is empty
  if (!board[destRow][col]) {
    moves.push(`${destRow}-${col}`);

    // Can move 2 squares if this is the start position
    if (row === startRow) {
      const secondDestRow = row + 2 * rowOffset;
      // Check if the destination is empty
      if (!board[secondDestRow][col]) {
        moves.push(`${secondDestRow}-${col}`);
      }
    }
  }

  // Check if there're opponents to be 'defeated'
  for (const colOffset of [1, -1]) {
    const destCol = col + colOffset;
    if (!validCol(destCol)) {
      continue;
    }

    // Empty square
    const square = board[destRow][destCol];
    if (!square) {
      continue;
    }

    // The square contains opponent's piece
    const [pieceColor] = square;
    if (pieceColor !== turn) {
      moves.push(`${destRow}-${destCol}`);
    }
  }

  return moves;
};

export { getPawnMoves };
