import { Fragment, useState } from "react";

import { Board as BoardType, Color, SquarePos } from "../types";
import { BLACK, WHITE } from "../constants";
import { getMoves, makeMove } from "../moves";
import { posString } from "../utils";
import Square from "./Square";

const initialBoard: BoardType = [
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
  const [turn, setTurn] = useState<Color>(WHITE);
  const [board, setBoard] = useState(initialBoard);
  const [currentSquare, setCurrentSquare] = useState<SquarePos | "">("");
  const [lastMove, setLastMove] = useState<SquarePos | "">("");
  const [moves, setMoves] = useState<SquarePos[]>([]);
  const [squaresToHighlight, setSquaresToHighlight] = useState<SquarePos[]>([]);

  const shouldHighlight = (row: number, col: number) =>
    squaresToHighlight.includes(`${row}-${col}`);

  const isLastMove = (row: number, col: number) => lastMove === `${row}-${col}`;

  const clearSelection = () => {
    setCurrentSquare("");
    setMoves([]);
    setSquaresToHighlight(() => []);
  };

  const swapTurn = () => {
    setTurn((turn) => (turn === WHITE ? BLACK : WHITE));
  };

  // first click shows possible moves
  // second click selects a move
  const selectSquare = (row: number, col: number) => {
    // Get position string for selected square
    const pos = posString(row, col);

    // Make a valid move
    if (currentSquare && moves.includes(pos)) {
      setBoard(makeMove(board, currentSquare, pos));
      setLastMove(pos);
      swapTurn();
      clearSelection();
      return;
    }

    // Must not select an empty square
    const square = board[row][col];
    if (!square) {
      if (currentSquare) {
        clearSelection();
      }
      return;
    }

    // Must select pieces with correct color
    const [pieceColor] = square;
    if (pieceColor !== turn) {
      if (currentSquare) {
        clearSelection();
      }
      return;
    }

    // Click the same piece twice
    if (currentSquare === pos) {
      clearSelection();
      return;
    }

    setCurrentSquare(pos);

    // Get valid moves for the piece
    const validMoves = getMoves(board, row, col, turn);
    setMoves(validMoves);

    // Highlight current square and valid moves
    setSquaresToHighlight(() => [pos, ...validMoves]);
  };

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
              lastMove={isLastMove(i, j)}
              selectSquare={selectSquare}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Board;
