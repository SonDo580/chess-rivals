import { Color } from ".";
import { Board, CastlingRights, CheckInfo, EnPassantInfo } from "../types";

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

const defaultEnPassantInfo: EnPassantInfo = { move: "", pieces: [] };

const defaultCheckInfo: CheckInfo = { king: null, attacks: [] };

const initialCastlingRights: CastlingRights = {
  [Color.BLACK]: {
    q: true,
    k: true,
  },
  [Color.WHITE]: {
    q: true,
    k: true,
  },
};

export {
  initialBoard,
  initialCastlingRights,
  defaultCheckInfo,
  defaultEnPassantInfo,
};
