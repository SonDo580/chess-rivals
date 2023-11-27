import { produce } from "immer";

import {
  Board,
  CastlingRight,
  CastlingSide,
  Color,
  Piece,
  SquarePos,
} from "../types";
import { DIRECTIONS } from "../constants/directions";
import { KING, ROOK, WHITE } from "../constants";
import { getAttackedKing } from "../attacks";
import { getOpponentColor, getPiece, onBoard, posParse, posString } from ".";
import { makeMove } from "../moves";

// Check if a square is next to the opponent king
const nearOpponentKing = (
  board: Board,
  row: number,
  col: number,
  turn: Color
) => {
  const opponentColor = getOpponentColor(turn);
  const opponentKing = getPiece(opponentColor, KING);

  for (const direction of DIRECTIONS.STAR) {
    const currentRow = row + direction[0];
    const currentCol = col + direction[1];
    if (!onBoard(currentRow, currentCol)) {
      continue;
    }

    if (board[currentRow][currentCol] === opponentKing) {
      return true;
    }
  }

  return false;
};

// Get the king position
const getKingPos = (board: Board, turn: Color) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === getPiece(turn, KING)) {
        return posString(i, j);
      }
    }
  }
};

// Update castling right for current player
const updateCastlingRight = (
  board: Board,
  fromPos: SquarePos,
  castlingRight: CastlingRight
): CastlingRight =>
  produce(castlingRight, (draft) => {
    const [row, col] = posParse(fromPos);
    const [pieceColor, pieceSymbol] = board[row][col] as Piece;

    // Remove all castling right if king moved
    if (pieceSymbol === KING) {
      draft.q = false;
      draft.k = false;
    }

    // Remove castling right for 1 side if rook moved from initial position
    if (pieceSymbol === ROOK) {
      const initialRow = pieceColor === WHITE ? 7 : 0;
      const initialCols = [0, 7];

      // The rook already moved
      if (row !== initialRow || !initialCols.includes(col)) {
        return;
      }

      const side = col === 0 ? "q" : "k";
      // The rook can move somewhere then move back to initial position
      // So the castling right for this side might already be removed
      // The following line will be redundant in that case
      draft[side] = false;
    }
  });

// Check if castling is possible
const castlingPossible = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  side: CastlingSide
) => {
  // Not allow if the king is under attack
  if (getAttackedKing(board, turn)) {
    return false;
  }

  const direction = side === "q" ? -1 : 1;
  const edgeCol = side === "q" ? 0 : 7;
  const fromPos = posString(row, col);

  // Check if there are pieces between king and rook
  let currentCol = col + direction;
  while (currentCol !== edgeCol) {
    if (board[row][currentCol]) {
      return false;
    }
    currentCol += direction;
  }

  for (const colOffset of [direction, direction * 2]) {
    const destCol = col + colOffset;
    // Not allow if the king pass through or end up
    // in a square that is next to opponent king
    if (nearOpponentKing(board, row, destCol, turn)) {
      return false;
    }

    // Not allow if the king pass through or end up
    // in a square that is under attack
    const toPos = posString(row, destCol);
    const nextBoard = makeMove(board, fromPos, toPos);
    if (getAttackedKing(nextBoard, turn)) {
      return false;
    }
  }

  return true;
};

export { nearOpponentKing, getKingPos, updateCastlingRight, castlingPossible };
