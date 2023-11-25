import { PAWN } from "../constants";
import { Board, Color, EnPassantInfo, SquarePos } from "../types";
import { defaultEnPassantInfo } from "../contexts/GameReducer";
import { posParse, posString, validCol } from ".";

const checkEnPassant = (
  board: Board,
  from: SquarePos,
  to: SquarePos,
  turn: Color
): EnPassantInfo => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow] = posParse(to);
  const square = board[fromRow][fromCol];
  if (!square) {
    return defaultEnPassantInfo;
  }

  const [pieceColor, pieceSymbol] = square;
  if (pieceColor !== turn || pieceSymbol !== PAWN) {
    return defaultEnPassantInfo;
  }

  const pieces: SquarePos[] = [];
  // Check if the pawn moved 2 rows (only happen from initial position)
  if (Math.abs(fromRow - toRow) === 2) {
    // Check 2 squares next to 'to' for opponent's pawns
    for (const colOffset of [-1, 1]) {
      const destCol = fromCol + colOffset;
      if (!validCol(destCol)) {
        continue;
      }

      const square = board[toRow][destCol];
      if (!square) {
        continue;
      }

      const [pieceColor, pieceSymbol] = square;
      if (pieceColor !== turn && pieceSymbol === PAWN) {
        pieces.push(posString(toRow, destCol));
      }
    }

    // Check if en passant can be performed
    if (pieces.length > 0) {
      return {
        move: posString((fromRow + toRow) / 2, fromCol),
        pieces,
      };
    }
  }

  return defaultEnPassantInfo;
};

export { checkEnPassant };
