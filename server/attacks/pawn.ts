import { PieceSymbol, Color } from "../constants";
import { Board, SquarePos } from "../types";
import { getPiece, posString, validCol, validRow } from "../utils";

// Check for pawn attacks
const isAttackedByPawn = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
) => {
  const rowOffset = opponentColor === Color.WHITE ? 1 : -1;
  const destRow = row + rowOffset;

  if (!validRow(destRow)) {
    return false;
  }

  for (const colOffset of [-1, 1]) {
    const destCol = col + colOffset;
    if (!validCol(destCol)) {
      continue;
    }

    if (board[destRow][destCol] === getPiece(opponentColor, PieceSymbol.PAWN)) {
      return true;
    }
  }

  return false;
};

// Get pawn attacks
const getPawnAttacks = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
): SquarePos[] => {
  const rowOffset = opponentColor === Color.WHITE ? 1 : -1;
  const destRow = row + rowOffset;

  if (!validRow(destRow)) {
    return [];
  }

  const attacks: SquarePos[] = [];
  for (const colOffset of [-1, 1]) {
    const destCol = col + colOffset;
    if (!validCol(destCol)) {
      continue;
    }

    if (board[destRow][destCol] === getPiece(opponentColor, PieceSymbol.PAWN)) {
      attacks.push(posString(destRow, destCol));
    }
  }

  return attacks;
};

export { isAttackedByPawn, getPawnAttacks };
