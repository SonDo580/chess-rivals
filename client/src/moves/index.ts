import { produce } from "immer";

import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } from "../constants";
import { Board, Color, EnPassantInfo, Piece, SquarePos } from "../types";
import { posParse, posString } from "../utils";

import { getPawnMoves } from "./pawn";
import { getKnightMoves } from "./knight";
import { getBishopRookQueenMoves } from "./brq";
import { getKingMoves } from "./king";
import { getAttackedKing } from "../attacks";

// Get all valid moves for a piece
const getMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  enPassant: EnPassantInfo
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

  let moves: SquarePos[] = [];
  switch (pieceSymbol) {
    case PAWN:
      moves = getPawnMoves(board, row, col, turn, enPassant);
      break;
    case KNIGHT:
      moves = getKnightMoves(board, row, col, turn);
      break;
    case BISHOP:
    case ROOK:
    case QUEEN:
      moves = getBishopRookQueenMoves(board, row, col, turn, pieceSymbol);
      break;
    case KING:
      moves = getKingMoves(board, row, col, turn);
      break;
    default:
      return [];
  }

  // Exclude moves that put the king under attack
  const validMoves: SquarePos[] = [];
  const fromPos = posString(row, col);

  for (const toPos of moves) {
    const nextBoard = makeMove(board, fromPos, toPos, enPassant);
    if (!getAttackedKing(nextBoard, turn)) {
      validMoves.push(toPos);
    }
  }

  return validMoves;
};

// Make a valid move
const makeMove = (
  board: Board,
  from: SquarePos,
  to: SquarePos,
  enPassant: EnPassantInfo
) => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow, toCol] = posParse(to);
  const piece = board[fromRow][fromCol] as Piece;

  return produce(board, (draft) => {
    draft[toRow][toCol] = piece;
    draft[fromRow][fromCol] = "";

    // Remove the pawn captured by en passant
    if (enPassant.pieces.includes(from) && enPassant.move === to) {
      draft[fromRow][toCol] = "";
    }
  });
};

// Update a square with the given piece
const updateBoard = (board: Board, pos: SquarePos, piece: Piece) => {
  const [row, col] = posParse(pos);
  return produce(board, (draft) => {
    draft[row][col] = piece;
  });
};

export { getMoves, makeMove, updateBoard };
