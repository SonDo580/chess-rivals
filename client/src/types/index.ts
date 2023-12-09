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

type CastlingSide = "q" | "k";

type CastlingRight = {
  [K in CastlingSide]: boolean;
};

type CastlingRights = {
  [K in Color]: CastlingRight;
};

type GameResult = {
  kind?: "Checkmate" | "Stalemate" | "Draw";
  winner?: Color;
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
  CastlingSide,
  CastlingRight,
  CastlingRights,
  GameResult,
};
