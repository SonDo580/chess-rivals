import { PIECE } from "../pieces";
import { Color, PieceSymbol, Square as SquareType } from "../types";

type Props = {
  square: SquareType;
  row: number;
  col: number;
  highlight: boolean;
  selectSquare: (row: number, col: number) => void;
};

const getSquareBackgroundClass = (row: number, col: number) => {
  if (row % 2 === 0) {
    return col % 2 === 0 ? "light" : "bold";
  }
  return col % 2 === 0 ? "bold" : "light";
};

const getSquareHighlightClass = (highlight: boolean) =>
  highlight ? "highlight" : "";

const getSquareClass = (row: number, col: number, highlight: boolean) => {
  const bgClass = getSquareBackgroundClass(row, col);
  const highlightClass = getSquareHighlightClass(highlight);
  return `square ${bgClass} ${highlightClass}`;
};

const getSquareContent = (square: SquareType) => {
  if (!square) {
    return null;
  }
  const [pieceColor, pieceSymbol] = square;
  return PIECE[pieceColor as Color][pieceSymbol as PieceSymbol]();
};

function Square({ square, highlight, row, col, selectSquare }: Props) {
  const onClick = () => {
    selectSquare(row, col);
  };

  return (
    <div className={getSquareClass(row, col, highlight)} onClick={onClick}>
      {getSquareContent(square)}
    </div>
  );
}

export default Square;
