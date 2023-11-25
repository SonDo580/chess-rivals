import { Fragment, useContext } from "react";

import { PieceSymbol } from "../types";
import { isLastMove, shouldHighlight } from "../utils";
import { GameContext } from "../contexts/GameContext";

import Square from "./Square";
import Promote from "./Promote";
import { ACTIONS } from "../contexts/GameActions";

function Board() {
  const [state, dispatch] = useContext(GameContext);
  const { board, lastMove, squaresToHighlight, needPromotion } = state;

  const handlePromote = (piece: PieceSymbol) => {
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
