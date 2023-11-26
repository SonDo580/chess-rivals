type Color = "w" | "b";

type PieceSymbol = "p" | "n" | "b" | "r" | "q" | "k";

type PromotePieceSymbol = Exclude<PieceSymbol, "k" | "p">;

type Piece = `${Color}${PieceSymbol}`;

type PromotePiece = `${Color}${PromotePieceSymbol}`;

type Square = Piece | "";

type Board = Square[][];

type SquarePos = `${number}-${number}`;

type EnPassantInfo = {
  move: SquarePos | "";
  pieces: SquarePos[];
};

type King = "wk" | "bk";

type CheckInfo = {
  king: King | null;
  attacks: SquarePos[];
};

export type {
  Color,
  PieceSymbol,
  PromotePieceSymbol,
  Piece,
  PromotePiece,
  Square,
  Board,
  SquarePos,
  EnPassantInfo,
  King,
  CheckInfo,
};
