import { EnPassantInfo } from "../types";

// Color
const WHITE = "w";
const BLACK = "b";

// Piece
const PAWN = "p";
const KNIGHT = "n";
const BISHOP = "b";
const ROOK = "r";
const QUEEN = "q";
const KING = "k";

// En Passant
const defaultEnPassantInfo: EnPassantInfo = { move: "", pieces: [] };

export {
  WHITE,
  BLACK,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  defaultEnPassantInfo,
};
