import { Fragment, useContext } from "react";

import { socket } from "../utils/socket";
import { posString, shouldHighlight } from "../utils";
import { GameContext } from "../contexts/GameContext";
import Square from "./Square";

type Props = {
  allowMove: boolean;
};

function Board({ allowMove }: Props) {
  const {
    id: roomId,
    board,
    lastMove,
    squaresToHighlight,
    check,
    // result: { kind: resultKind, winner },
  } = useContext(GameContext);

  // useEffect(() => {
  //   if (!resultKind) {
  //     return;
  //   }

  //   if (resultKind === CHECKMATE) {
  //     alert(`${resultKind}! ${winner === BLACK ? "Black" : "White"} won!`);
  //   } else {
  //     alert(`${resultKind}!`);
  //   }
  // }, [resultKind, winner]);

  // first click shows possible moves
  // second click selects a move
  const selectSquare = (row: number, col: number) => {
    if (allowMove) {
      socket.emit("selectSquare", roomId, row, col);
    }
  };

  return (
    <div className="board">
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
