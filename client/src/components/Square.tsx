import { PIECE } from "../pieces";
import { Color, PieceSymbol, Square as SquareType } from "../types";

type Props = {
  square: SquareType;
  row: number;
  col: number;
  highlight: boolean;
  lastMove: boolean;
  selectSquare: (row: number, col: number) => void;
};

const getSquareBgClass = (row: number, col: number) => {
  if (row % 2 === 0) {
    return col % 2 === 0 ? "light" : "bold";
  }
  return col % 2 === 0 ? "bold" : "light";
};

const getSquareClass = (
  row: number,
  col: number,
  highlight: boolean,
  lastMove: boolean
) => {
  const bgClass = getSquareBgClass(row, col);
  const highlightClass = highlight ? "highlight" : "";
  const lastMoveClass = lastMove ? "last" : "";
  return `square ${bgClass} ${highlightClass} ${lastMoveClass}`;
};

const getSquareContent = (square: SquareType) => {
  if (!square) {
    return null;
  }
  const [pieceColor, pieceSymbol] = square;
  return PIECE[pieceColor as Color][pieceSymbol as PieceSymbol]();
};

function Square({
  square,
  row,
  col,
  highlight,
  lastMove,
  selectSquare,
}: Props) {
  const onClick = () => {
    selectSquare(row, col);
  };

  return (
    <div
      className={getSquareClass(row, col, highlight, lastMove)}
      onClick={onClick}
    >
      {getSquareContent(square)}
    </div>
  );
}

export default Square;
