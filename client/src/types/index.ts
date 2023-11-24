type Color = "w" | "b";

type PieceSymbol = "p" | "n" | "b" | "r" | "q" | "k";

type Piece = `${Color}${PieceSymbol}`;

type Square = Piece | "";

type Board = Square[][];

type SquarePos = `${number}-${number}`;

export type { Color, PieceSymbol, Piece, Square, Board, SquarePos };
