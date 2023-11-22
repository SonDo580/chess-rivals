import { PIECE } from "../pieces";
import { Color, PieceSymbol, Square as SquareType } from "../types";

type Props = {
  square: SquareType;
  row: number;
  col: number;
};

const getSquareBgClass = (row: number, col: number) => {
  if (row % 2 === 0) {
    return col % 2 === 0 ? "light" : "bold";
  }
  return col % 2 === 0 ? "bold" : "light";
};

const getSquareContent = (square: SquareType) => {
  if (!square) {
    return null;
  }
  const [pieceColor, pieceSymbol] = square;
  return PIECE[pieceColor as Color][pieceSymbol as PieceSymbol]();
};

function Square({ square, row, col }: Props) {
  return (
    <div className={`square ${getSquareBgClass(row, col)}`}>
      {getSquareContent(square)}
    </div>
  );
}

export default Square;
