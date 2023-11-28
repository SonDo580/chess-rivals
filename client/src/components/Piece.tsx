/// <reference types="vite-plugin-svgr/client" />

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
import { Color, PieceSymbol, Square } from "../types";

import WhiteBishop from "../pieces/WhiteBishop.svg?react";
import WhiteKing from "../pieces/WhiteKing.svg?react";
import WhiteKnight from "../pieces/WhiteKnight.svg?react";
import WhitePawn from "../pieces/WhitePawn.svg?react";
import WhiteQueen from "../pieces/WhiteQueen.svg?react";
import WhiteRook from "../pieces/WhiteRook.svg?react";

import BlackBishop from "../pieces/BlackBishop.svg?react";
import BlackKing from "../pieces/BlackKing.svg?react";
import BlackKnight from "../pieces/BlackKnight.svg?react";
import BlackPawn from "../pieces/BlackPawn.svg?react";
import BlackQueen from "../pieces/BlackQueen.svg?react";
import BlackRook from "../pieces/BlackRook.svg?react";

type Pieces = {
  [C in Color]: {
    [S in PieceSymbol]: JSX.Element;
  };
};

const PIECES: Pieces = {
  [WHITE]: {
    [KING]: <WhiteKing />,
    [QUEEN]: <WhiteQueen />,
    [ROOK]: <WhiteRook />,
    [BISHOP]: <WhiteBishop />,
    [KNIGHT]: <WhiteKnight />,
    [PAWN]: <WhitePawn />,
  },
  [BLACK]: {
    [KING]: <BlackKing />,
    [QUEEN]: <BlackQueen />,
    [ROOK]: <BlackRook />,
    [BISHOP]: <BlackBishop />,
    [KNIGHT]: <BlackKnight />,
    [PAWN]: <BlackPawn />,
  },
};

type Props = {
  square: Square;
};

function Piece({ square }: Props) {
  if (!square) {
    return null;
  }
  const [color, symbol] = square;
  return PIECES[color as Color][symbol as PieceSymbol];
}

export default Piece;
