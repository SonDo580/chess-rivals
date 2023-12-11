import { Color, PieceSymbol } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { Board, SquarePos } from "../types";
import { onBoard, posString } from "../utils";

const BRQ_DIRECTIONS: {
  [piece: string]: [number, number][];
} = {
  [PieceSymbol.BISHOP]: DIRECTIONS.DIAGONAL,
  [PieceSymbol.ROOK]: DIRECTIONS.STRAIGHT,
  [PieceSymbol.QUEEN]: DIRECTIONS.STAR,
};

const getBishopRookQueenMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  piece: PieceSymbol
): SquarePos[] => {
  const moves: SquarePos[] = [];
  const directions = BRQ_DIRECTIONS[piece];

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

      const pos = posString(currentRow, currentCol);
      const square = board[currentRow][currentCol];

      // Add empty squares
      if (!square) {
        moves.push(pos);
        continue;
      }

      // Stop if hit a same-color piece
      // Add the move and stop if hit an opponent's piece
      const [pieceColor] = square;
      if (pieceColor !== turn) {
        moves.push(pos);
      }
      break;
    }
  }

  return moves;
};

export { getBishopRookQueenMoves };
