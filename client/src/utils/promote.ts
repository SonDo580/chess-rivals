import { BLACK, PAWN, WHITE } from "../constants";
import { Board, Color, SquarePos } from "../types";
import { posParse } from ".";

const needPromotion = (board: Board, lastMove: SquarePos, turn: Color) => {
  const [row, col] = posParse(lastMove);

  const square = board[row][col];
  if (!square) {
    return false;
  }

  const [pieceColor, pieceSymbol] = square;
  if (pieceSymbol !== PAWN || pieceColor !== turn) {
    return false;
  }

  return (turn === WHITE && row === 0) || (turn === BLACK && row === 7);
};

export { needPromotion };
