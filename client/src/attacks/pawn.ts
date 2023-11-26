import { WHITE, PAWN } from "../constants";
import { Board, Color, SquarePos } from "../types";
import { getPiece, posString, validCol, validRow } from "../utils";

// Check for pawn attacks
const isAttackedByPawn = (
  board: Board,
  row: number,
  col: number,
  opponentColor: Color
) => {
  const rowOffset = opponentColor === WHITE ? 1 : -1;
  const destRow = row + rowOffset;

  if (!validRow(destRow)) {
    return false;
  }

  for (const colOffset of [-1, 1]) {
    const destCol = col + colOffset;
    if (!validCol(destCol)) {
      continue;
    }

    if (board[destRow][destCol] === getPiece(opponentColor, PAWN)) {
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
  const rowOffset = opponentColor === WHITE ? 1 : -1;
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

    if (board[destRow][destCol] === getPiece(opponentColor, PAWN)) {
      attacks.push(posString(destRow, destCol));
    }
  }

  return attacks;
};

export { isAttackedByPawn, getPawnAttacks };
