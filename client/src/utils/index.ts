import { BLACK, PAWN, WHITE } from "../constants";
import {
  Board,
  Color,
  Piece,
  PieceSymbol,
  PromotePieceSymbol,
  SquarePos,
} from "../types";

const validRow = (row: number) => row >= 0 && row < 8;

const validCol = (col: number) => col >= 0 && col < 8;

const onBoard = (row: number, col: number) => validRow(row) && validCol(col);

const posString = (row: number, col: number): SquarePos => `${row}-${col}`;

const posParse = (pos: SquarePos): [number, number] => {
  const [row, col] = pos.split("-");
  return [Number(row), Number(col)];
};

const shouldHighlight = (
  squaresToHighlight: SquarePos[],
  row: number,
  col: number
) => squaresToHighlight.includes(posString(row, col));

const isLastMove = (lastMove: SquarePos | "", row: number, col: number) =>
  lastMove === posString(row, col);

const getOpponentColor = (turn: Color): Color =>
  turn === WHITE ? BLACK : WHITE;

type GetPieceReturnType<T> = T extends PromotePieceSymbol
  ? `${Color}${T}`
  : T extends PieceSymbol
  ? `${Color}${T}`
  : never;

const getPiece = <T extends PieceSymbol | PromotePieceSymbol>(
  color: Color,
  piece: T
): GetPieceReturnType<T> => {
  return `${color}${piece}` as GetPieceReturnType<T>;
};

const checkInclude = <T extends K, K>(arr: T[], val: K) =>
  arr.some((item) => item === val);

const shouldReset50Move = (board: Board, from: SquarePos, to: SquarePos) => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow, toCol] = posParse(to);

  // Check for pawn move or capturing
  const pieceSymbol = board[fromRow][fromCol][1];
  const toSquare = board[toRow][toCol];
  return pieceSymbol === PAWN || toSquare !== "";
};

export {
  onBoard,
  validRow,
  validCol,
  posString,
  posParse,
  shouldHighlight,
  isLastMove,
  getOpponentColor,
  getPiece,
  checkInclude,
  shouldReset50Move,
};
