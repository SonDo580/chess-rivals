import { produce } from "immer";

import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } from "../constants";
import { Board, Color, SquarePos } from "../types";
import { posParse } from "../utils";

import { getPawnMoves } from "./pawn";
import { getKnightMoves } from "./knight";
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
const makeMove = (board: Board, from: SquarePos, to: SquarePos) => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow, toCol] = posParse(to);
  const piece = board[fromRow][fromCol];

  return produce(board, (draft) => {
    draft[toRow][toCol] = piece;
    draft[fromRow][fromCol] = "";
  });
};

export { getMoves, makeMove };
