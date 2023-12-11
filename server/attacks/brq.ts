import { PieceSymbol, Color } from "../constants";
import { DIRECTIONS } from "../constants/directions";
import { Board, SquarePos } from "../types";
import { checkInclude, getPiece, onBoard, posString } from "../utils";

// Check for bishop, rook or queen attacks
const isAttackedByBishopRookQueen = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
) => {
  const opponentBishop = getPiece(opponentColor, PieceSymbol.BISHOP);
  const opponentRook = getPiece(opponentColor, PieceSymbol.ROOK);
  const opponentQueen = getPiece(opponentColor, PieceSymbol.QUEEN);

  for (const key of ["DIAGONAL", "STRAIGHT"]) {
    const directions = DIRECTIONS[key];
    const pieces =
      key === "DIAGONAL"
        ? [opponentBishop, opponentQueen]
        : [opponentRook, opponentQueen];

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

        // Continue if the square is empty
        const square = board[currentRow][currentCol];
        if (!square) {
          continue;
        }

        // Add postion if the piece is the needed piece
        if (checkInclude(pieces, board[currentRow][currentCol])) {
          return true;
        }
        break;
      }
    }
  }

  return false;
};

// Get bishop, rook and queen attacks
const getBishopRookQueenAttacks = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
): SquarePos[] => {
  const attacks: SquarePos[] = [];
  const opponentBishop = getPiece(opponentColor, PieceSymbol.BISHOP);
  const opponentRook = getPiece(opponentColor, PieceSymbol.ROOK);
  const opponentQueen = getPiece(opponentColor, PieceSymbol.QUEEN);

  for (const key of ["DIAGONAL", "STRAIGHT"]) {
    const directions = DIRECTIONS[key];
    const pieces =
      key === "DIAGONAL"
        ? [opponentBishop, opponentQueen]
        : [opponentRook, opponentQueen];

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

        // Continue if the square is empty
        const square = board[currentRow][currentCol];
        if (!square) {
          continue;
        }

        if (checkInclude(pieces, board[currentRow][currentCol])) {
          attacks.push(posString(currentRow, currentCol));
        }
        break;
      }
    }
  }

  return attacks;
};

export { isAttackedByBishopRookQueen, getBishopRookQueenAttacks };
