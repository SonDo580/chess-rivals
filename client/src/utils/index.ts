import { SquarePos } from "../types";

const validRow = (row: number) => row >= 0 && row < 8;

const validCol = (col: number) => col >= 0 && col < 8;

const onBoard = (row: number, col: number) => validRow(row) && validCol(col);

const posString = (row: number, col: number): SquarePos => `${row}-${col}`;

const posParse = (pos: SquarePos): [number, number] => {
  const [row, col] = pos.split("-");
  return [Number(row), Number(col)];
};

export { onBoard, validRow, validCol, posString, posParse };
