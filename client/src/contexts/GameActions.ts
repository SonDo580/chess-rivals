import { PromotePieceSymbol } from "../types";

enum ACTIONS {
  SELECT_SQUARE = "SELECT_SQUARE",
  PROMOTE = "PROMOTE",
}

type SelectSquareAction = {
  type: ACTIONS.SELECT_SQUARE;
  row: number;
  col: number;
};

type PromoteAction = {
  type: ACTIONS.PROMOTE;
  piece: PromotePieceSymbol;
};

type GameAction = SelectSquareAction | PromoteAction;

export { ACTIONS };
export type { GameAction };
