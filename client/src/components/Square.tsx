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
  const onClick = () => {
    selectSquare(row, col);
  };

  return (
    <div
      className={getSquareClass(row, col, highlight, lastMove, checked)}
      onClick={onClick}
    >
      <Piece square={square} />
    </div>
  );
}

export default Square;
