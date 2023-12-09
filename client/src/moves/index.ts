import { produce } from "immer";

import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } from "../constants";
import {
  Board,
  CastlingRight,
  Color,
  EnPassantInfo,
  Piece,
  PieceSymbol,
  SquarePos,
} from "../types";
import { posParse, posString } from "../utils";
import { getAttackedKing } from "../attacks";

import { getPawnMoves } from "./pawn";
import { getKnightMoves } from "./knight";
import { getBishopRookQueenMoves } from "./brq";
import { getKingMoves } from "./king";

// Get all valid moves for a piece
const getMoves = (
  board: Board,
  row: number,
  col: number,
  turn: Color,
  enPassant: EnPassantInfo,
  castlingRight: CastlingRight
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
      moves = getKingMoves(board, row, col, turn, castlingRight);
      break;
    default:
      return [];
  }

  // Exclude moves that put the king under attack
  const validMoves: SquarePos[] = [];
  const fromPos = posString(row, col);

  for (const toPos of moves) {
    // Don't need to pass 'castlingRight' here
    // Castling moves are examined in 'getKingMoves'
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
  enPassant?: EnPassantInfo,
  castlingRight?: CastlingRight
) => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow, toCol] = posParse(to);
  const piece = board[fromRow][fromCol] as Piece;
  const pieceSymbol = piece[1] as PieceSymbol;

  return produce(board, (draft) => {
    draft[toRow][toCol] = piece;
    draft[fromRow][fromCol] = "";

    // Remove the pawn captured by en passant
    if (enPassant && enPassant.pieces.includes(from) && enPassant.move === to) {
      draft[fromRow][toCol] = "";
    }

    // Check for castling move
    // If the king moved 2 columns, this must be castling
    // So we also need to update position for the rook
    if (pieceSymbol === KING && castlingRight) {
      if (castlingRight.k && toCol - fromCol === 2) {
        // King side
        draft[fromRow][toCol - 1] = draft[fromRow][7];
        draft[fromRow][7] = "";
      } else if (castlingRight.q && fromCol - toCol === 2) {
        // Queen side
        draft[fromRow][toCol + 1] = draft[fromRow][0];
        draft[fromRow][0] = "";
      }
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

// Check if there are available moves for current turn
const checkMove = (
  board: Board,
  turn: Color,
  enPassant: EnPassantInfo,
  castlingRight: CastlingRight
) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = board[i][j];
      if (!square) {
        continue;
      }

      if (square[0] !== turn) {
        continue;
      }

      const moves = getMoves(board, i, j, turn, enPassant, castlingRight);
      if (moves.length > 0) {
        return true;
      }
    }
  }
  return false;
};

export { getMoves, makeMove, updateBoard, checkMove };
