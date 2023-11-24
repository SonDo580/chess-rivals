import { BLACK, PAWN, WHITE } from "../constants";
import { Board, Color, SquarePos } from "../types";

const validRow = (row: number) => row >= 0 && row < 8;

const validCol = (col: number) => col >= 0 && col < 8;

const onBoard = (row: number, col: number) => validRow(row) && validCol(col);

const posString = (row: number, col: number): SquarePos => `${row}-${col}`;

const posParse = (pos: SquarePos): [number, number] => {
  const [row, col] = pos.split("-");
  return [Number(row), Number(col)];
};

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

export { onBoard, validRow, validCol, posString, posParse, needPromotion };
