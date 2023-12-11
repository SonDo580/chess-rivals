import { Fragment, useContext } from "react";

import { socket } from "../utils/socket";
import { posString, shouldHighlight } from "../utils";
import { getBoardClass } from "../utils/style";
import { GameContext } from "../contexts/GameContext";
import Square from "./Square";

type Props = {
  allowMove: boolean;
  flip: boolean;
};

function Board({ allowMove, flip }: Props) {
  const {
    id: roomId,
    board,
    lastMove,
    squaresToHighlight,
    check,
  } = useContext(GameContext);

  // first click shows possible moves
  // second click selects a move
  const selectSquare = (row: number, col: number) => {
    if (allowMove) {
      socket.emit("selectSquare", roomId, row, col);
    }
  };

  return (
    <div className={getBoardClass(flip)}>
      {board!.map((row, i) => (
        <Fragment key={i}>
          {row.map((square, j) => (
            <Square
              key={j}
              square={square}
              row={i}
              col={j}
              highlight={shouldHighlight(squaresToHighlight!, i, j, allowMove)}
              lastMove={lastMove === posString(i, j)}
              checked={square === check!.king}
              selectSquare={selectSquare}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Board;
