import { PIECE } from "../pieces";
import { Color, PieceSymbol, Square } from "../types";

const getSquareBgClass = (row: number, col: number) => {
  if (row % 2 === 0) {
    return col % 2 === 0 ? "light" : "bold";
  }
  return col % 2 === 0 ? "bold" : "light";
};

const getHighlightClass = (highlight: boolean, lastMove: boolean) => {
  const highlightClass = highlight ? "highlight" : "";
  const lastMoveClass = lastMove ? "last" : "";
  return highlightClass || lastMoveClass;
};

const getSquareClass = (
  row: number,
  col: number,
  highlight: boolean,
  lastMove: boolean
) => {
  const bgClass = getSquareBgClass(row, col);
  const highlightClass = getHighlightClass(highlight, lastMove);
  return `square ${bgClass} ${highlightClass}`;
};

const getSquareContent = (square: Square) => {
  if (!square) {
    return null;
  }
  const [pieceColor, pieceSymbol] = square;
  return PIECE[pieceColor as Color][pieceSymbol as PieceSymbol]();
};

export { getSquareClass, getSquareContent };
