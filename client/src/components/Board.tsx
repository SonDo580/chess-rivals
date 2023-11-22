import { Fragment, useState } from "react";

import { Square as SquareType } from "../types";
import Square from "./Square";

const initialBoard: SquareType[][] = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

function Board() {
  const [board, setBoard] = useState(initialBoard);

  return (
    <div className="board">
      {board.map((row, i) => (
        <Fragment key={i}>
          {row.map((square, j) => (
            <Square key={j} square={square} row={i} col={j} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Board;
