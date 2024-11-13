// Color
enum Color {
  WHITE = "w",
  BLACK = "b",
}

// Piece Symbol
enum PieceSymbol {
  PAWN = "p",
  KNIGHT = "n",
  BISHOP = "b",
  ROOK = "r",
  QUEEN = "q",
  KING = "k",
}

// Game Result
enum ResultKind {
  CHECKMATE = "Checkmate",
  STALEMATE = "Stalemate",
  DRAW = "Draw",
}

export { Color, PieceSymbol, ResultKind };
