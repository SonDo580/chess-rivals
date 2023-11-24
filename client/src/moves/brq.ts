import { BISHOP, QUEEN, ROOK } from "../constants";
import { Board, Color, PieceSymbol, SquarePos } from "../types";
import { onBoard } from "../utils";

// TODO:
// Check

// row and col offsets for diagonals
const bishopDirections: [number, number][] = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

// row and col offsets for horizontal and vertical lines
const rookDirections: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const DIRECTIONS: {
  [piece: string]: [number, number][];
} = {
  [BISHOP]: bishopDirections,
  [ROOK]: rookDirections,
  [QUEEN]: [...bishopDirections, ...rookDirections],
};

const getBishopRookQueenMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  piece: PieceSymbol
): SquarePos[] => {
  const moves: SquarePos[] = [];
  const directions = DIRECTIONS[piece];

  for (const direction of directions) {
    let currentRow = row;
    let currentCol = col;

    // Keep checking in 1 direction
    // eslint-disable-next-line no-constant-condition
    while (true) {
      currentRow = currentRow + direction[0];
      currentCol = currentCol + direction[1];

      // Stop if jump out of the board
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

export { getBishopRookQueenMoves };
