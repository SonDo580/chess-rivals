import { DIRECTIONS } from "../constants/directions";
import { Board, Color, SquarePos } from "../types";
import { onBoard, posString } from "../utils";
import { nearOpponentKing } from "../utils/king";

// TODO:
// Castling

const getKingMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color
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

  return moves;
};

export { getKingMoves };
