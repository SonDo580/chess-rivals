import { Color, PieceSymbol, ResultKind } from "../constants";

type PromotePieceSymbol = Exclude<
  PieceSymbol,
  PieceSymbol.KING | PieceSymbol.PAWN
>;

type Piece = `${Color}${PieceSymbol}`;

type PromotePiece = `${Color}${PromotePieceSymbol}`;

type Square = Piece | "";

type Board = Square[][];

type SquarePos = `${number}-${number}`;

type EnPassantInfo = {
  move: SquarePos | "";
  pieces: SquarePos[];
};

type King = `${Color}${PieceSymbol.KING}`;

type CheckInfo = {
  king: King | null;
  attacks: SquarePos[];
};

type CastlingSide = PieceSymbol.KING | PieceSymbol.QUEEN;

type CastlingRight = {
  [key in CastlingSide]: boolean;
};

type CastlingRights = {
  [key in Color]: CastlingRight;
};

type Result = {
  kind?: ResultKind;
  winner?: Color;
};

type Player = {
  id: string;
  name: string;
  color: Color;
};

type Room = Partial<{
  id: string;
  players: Player[];
  turn: Color;
  board: Board;
  currentSquare: SquarePos | "";
  lastMove: SquarePos | "";
  moves: SquarePos[];
  squaresToHighlight: SquarePos[];
  needPromotion: boolean;
  enPassant: EnPassantInfo;
  check: CheckInfo;
  castlingRights: CastlingRights;
  fiftyMoveCount: number;
  result: Result;
  resetPending: boolean;
}>;

export type {
  PromotePieceSymbol,
  Piece,
  PromotePiece,
  Square,
  Board,
  SquarePos,
  King,
  CheckInfo,
  Result,
  Player,
  Room,
};
