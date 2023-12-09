import { Fragment, useContext, useEffect } from "react";

import { PromotePieceSymbol } from "../types";
import { isLastMove, shouldHighlight } from "../utils";
import { GameContext } from "../contexts/GameContext";
import { ACTIONS } from "../contexts/GameActions";

import Square from "./Square";
import Promote from "./Promote";
import { BLACK, CHECKMATE } from "../constants";

function Board() {
  const [state, dispatch] = useContext(GameContext);
  const {
    board,
    lastMove,
    squaresToHighlight,
    needPromotion,
    check,
    result: { kind: resultKind, winner },
  } = state;

  useEffect(() => {
    if (!resultKind) {
      return;
    }

    if (resultKind === CHECKMATE) {
      alert(`${resultKind}! ${winner === BLACK ? "Black" : "White"} won!`);
    } else {
      alert(`${resultKind}!`);
    }
  }, [resultKind, winner]);

  const handlePromote = (piece: PromotePieceSymbol) => {
    dispatch({
      type: ACTIONS.PROMOTE,
      piece,
    });
  };

  // first click shows possible moves
  // second click selects a move
  const selectSquare = (row: number, col: number) => {
    dispatch({
      type: ACTIONS.SELECT_SQUARE,
      row,
      col,
    });
  };

  return (
    <>
      <div className="board">
        {board.map((row, i) => (
          <Fragment key={i}>
            {row.map((square, j) => (
              <Square
                key={j}
                square={square}
                row={i}
                col={j}
                highlight={shouldHighlight(squaresToHighlight, i, j)}
                lastMove={isLastMove(lastMove, i, j)}
                checked={square === check.king}
                selectSquare={selectSquare}
              />
            ))}
          </Fragment>
        ))}
      </div>

      {needPromotion && <Promote handlePromote={handlePromote} />}
    </>
  );
}

export default Board;
