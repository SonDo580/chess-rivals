import { Square as SquareType } from "../types";
import { getSquareClass, getSquareContent } from "../utils/square";

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
  const onClick = () => {
    selectSquare(row, col);
  };

  return (
    <div
      className={getSquareClass(row, col, highlight, lastMove, checked)}
      onClick={onClick}
    >
      {getSquareContent(square)}
    </div>
  );
}

export default Square;
