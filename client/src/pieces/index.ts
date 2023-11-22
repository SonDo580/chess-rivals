import {
  BISHOP,
  BLACK,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
  WHITE,
} from "../constants";

import WhiteBishop from "./WhiteBishop";
import WhiteKing from "./WhiteKing";
import WhiteKnight from "./WhiteKnight";
import WhitePawn from "./WhitePawn";
import WhiteQueen from "./WhiteQueen";
import WhiteRook from "./WhiteRook";

import BlackBishop from "./BlackBishop";
import BlackKing from "./BlackKing";
import BlackKnight from "./BlackKnight";
import BlackPawn from "./BlackPawn";
import BlackQueen from "./BlackQueen";
import BlackRook from "./BlackRook";

// Unicode chess symbols
const PIECE = {
  [WHITE]: {
    [KING]: WhiteKing,
    [QUEEN]: WhiteQueen,
    [ROOK]: WhiteRook,
    [BISHOP]: WhiteBishop,
    [KNIGHT]: WhiteKnight,
    [PAWN]: WhitePawn,
  },
  [BLACK]: {
    [KING]: BlackKing,
    [QUEEN]: BlackQueen,
    [ROOK]: BlackRook,
    [BISHOP]: BlackBishop,
    [KNIGHT]: BlackKnight,
    [PAWN]: BlackPawn,
  },
};

export { PIECE };
