import { Fragment, useState } from "react";

import { Square as SquareType } from "../types";
import { WHITE } from "../constants";
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
  const [turn, setTurn] = useState(WHITE);
  const [board, setBoard] = useState(initialBoard);
  const [currentSquare, setCurrentSquare] = useState("");
  const [squaresToHighlight, setSquaresToHighlight] = useState<string[]>([]);

  const clearHighlight = () => {
    setCurrentSquare("");
    setSquaresToHighlight(() => []);
  };

  const selectSquare = (row: number, col: number) => {
    const square = board[row][col];
    // Must not select an empty square
    if (!square) {
      if (currentSquare) {
        clearHighlight();
      }
      return;
    }

    // Must select pieces with correct color
    const [pieceColor, pieceSymbol] = square;
    if (pieceColor !== turn) {
      if (currentSquare) {
        clearHighlight();
      }
      return;
    }

    // Click the same piece twice
    if (currentSquare === `${row}-${col}`) {
      clearHighlight();
      return;
    }

    // Select a different piece
    setCurrentSquare(`${row}-${col}`);
    setSquaresToHighlight(() => [`${row}-${col}`]);
  };

  const shouldHighlight = (row: number, col: number) =>
    squaresToHighlight.includes(`${row}-${col}`);

  return (
    <div className="board">
      {board.map((row, i) => (
        <Fragment key={i}>
          {row.map((square, j) => (
            <Square
              key={j}
              square={square}
              row={i}
              col={j}
              highlight={shouldHighlight(i, j)}
              selectSquare={selectSquare}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Board;
