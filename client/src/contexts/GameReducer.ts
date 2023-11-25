import { WHITE } from "../constants";
import { Board, Color, SquarePos } from "../types";

const initialBoard: Board = [
  ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
  ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
  ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
];

type GameState = {
  turn: Color;
  board: Board;
  currentSquare: SquarePos | "";
  lastMove: SquarePos | "";
  moves: SquarePos[];
  squaresToHighlight: SquarePos[];
  needPromotion: boolean;
};

const initialState: GameState = {
  board: initialBoard,
  turn: WHITE,
  currentSquare: "",
  lastMove: "",
  moves: [],
  squaresToHighlight: [],
  needPromotion: false,
};

type GameAction = {
  type: string;
};

const reducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { initialState, reducer };
export type { GameState, GameAction };
