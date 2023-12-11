import { Color, PieceSymbol } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { Board, CastlingRight, SquarePos } from "../types";
import { onBoard, posString } from "../utils";
import { castlingPossible, nearOpponentKing } from "../utils/king";

const getKingMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  castlingRight: CastlingRight
): SquarePos[] => {
  const moves: SquarePos[] = [];

  // Check all surrouding squares
  for (const direction of DIRECTIONS.STAR) {
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

    // Don't move near opponent king
    if (nearOpponentKing(board, destRow, destCol, turn)) {
      continue;
    }

    // Add the move
    moves.push(posString(destRow, destCol));
  }

  // Add castling moves
  // King side
  if (
    castlingRight.k &&
    castlingPossible(board, row, col, turn, PieceSymbol.KING)
  ) {
    moves.push(posString(row, col + 2));
  }
  // Queen side
  if (
    castlingRight.q &&
    castlingPossible(board, row, col, turn, PieceSymbol.QUEEN)
  ) {
    moves.push(posString(row, col - 2));
  }

  return moves;
};

export { getKingMoves };
