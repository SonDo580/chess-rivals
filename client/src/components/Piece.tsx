/// <reference types="vite-plugin-svgr/client" />

import { Color, PieceSymbol } from "../constants";
import { Piece as PieceType } from "../types";

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
  [Color.WHITE]: {
    [PieceSymbol.KING]: <WhiteKing />,
    [PieceSymbol.QUEEN]: <WhiteQueen />,
    [PieceSymbol.ROOK]: <WhiteRook />,
    [PieceSymbol.BISHOP]: <WhiteBishop />,
    [PieceSymbol.KNIGHT]: <WhiteKnight />,
    [PieceSymbol.PAWN]: <WhitePawn />,
  },
  [Color.BLACK]: {
    [PieceSymbol.KING]: <BlackKing />,
    [PieceSymbol.QUEEN]: <BlackQueen />,
    [PieceSymbol.ROOK]: <BlackRook />,
    [PieceSymbol.BISHOP]: <BlackBishop />,
    [PieceSymbol.KNIGHT]: <BlackKnight />,
    [PieceSymbol.PAWN]: <BlackPawn />,
  },
};

type Props = {
  piece: PieceType;
};

function Piece({ piece }: Props) {
  const [color, symbol] = piece;
  return PIECES[color as Color][symbol as PieceSymbol];
}

export default Piece;
