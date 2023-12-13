import { Square as SquareType } from "../types";
import { getSquareClass } from "../utils/style";
import Piece from "./Piece";

type Props = {
  square: SquareType;
  row: number;
  col: number;
  highlight: boolean;
  lastMove: boolean;
  checked: boolean;
  selectSquare: (row: number, col: number) => void;
};

function Square({
  square,
  row,
  col,
  highlight,
  lastMove,
  checked,
  selectSquare,
}: Props) {
  const squareClass = getSquareClass(row, col, highlight, lastMove, checked);

  const handleClick = () => {
    selectSquare(row, col);
  };

  return (
    <div className={squareClass} onClick={handleClick}>
      {square && <Piece piece={square} />}
    </div>
  );
}

export default Square;
