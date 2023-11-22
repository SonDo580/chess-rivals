type Color = "w" | "b";

type PieceSymbol = "p" | "n" | "b" | "r" | "q" | "k";

type Piece = `${Color}${PieceSymbol}`;

type Square = Piece | "";

export type { Color, PieceSymbol, Piece, Square };
