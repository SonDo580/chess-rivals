import { produce } from "immer";

import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } from "../constants";
import { Board, Color, SquarePos } from "../types";
import { getKnightMoves } from "./knight";
import { getPawnMoves } from "./pawn";
import { getBishopRookQueenMoves } from "./brq";
import { getKingMoves } from "./king";

// Get all valid moves for a piece
const getMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color
): SquarePos[] => {
  // Empty square
  const square = board[row][col];
  if (!square) {
    return [];
  }

  // Incorrect turn
  const [pieceColor, pieceSymbol] = square;
  if (pieceColor !== turn) {
    return [];
  }

  switch (pieceSymbol) {
    case PAWN:
      return getPawnMoves(board, row, col, turn);
    case KNIGHT:
      return getKnightMoves(board, row, col, turn);
    case BISHOP:
    case ROOK:
    case QUEEN:
      return getBishopRookQueenMoves(board, row, col, turn, pieceSymbol);
    case KING:
      return getKingMoves(board, row, col, turn);
    default:
      return [];
  }
};

// Make a valid move
const makeMove = (board: Board, from: string, to: string) => {
  const [fromRow, fromCol] = from.split("-");
  const [toRow, toCol] = to.split("-");
  const piece = board[Number(fromRow)][Number(fromCol)];

  return produce(board, (draft) => {
    draft[Number(toRow)][Number(toCol)] = piece;
    draft[Number(fromRow)][Number(fromCol)] = "";
  });
};

export { getMoves, makeMove };
