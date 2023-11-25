import { produce } from "immer";

import { BLACK, WHITE, defaultEnPassantInfo } from "../constants";
import { Board, Color, EnPassantInfo, Piece, SquarePos } from "../types";
import { ACTIONS, GameAction } from "./GameActions";
import { checkEnPassant, needPromotion, posString } from "../utils";
import { getMoves, makeMove, updateBoard } from "../moves";

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
  enPassant: EnPassantInfo;
};

const initialState: GameState = {
  turn: WHITE,
  board: initialBoard,
  currentSquare: "",
  lastMove: "",
  moves: [],
  squaresToHighlight: [],
  needPromotion: false,
  enPassant: defaultEnPassantInfo,
};

const clearSelection = (draft: GameState) => {
  draft.currentSquare = "";
  draft.moves = [];
  draft.squaresToHighlight = [];
};

const swapTurn = (draft: GameState) => {
  draft.turn = draft.turn === WHITE ? BLACK : WHITE;
};

const reducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case ACTIONS.SELECT_SQUARE:
      // first click shows possible moves
      // second click selects a move
      return produce(state, (draft) => {
        const { row, col } = action;
        const { turn, board, currentSquare, moves, enPassant } = draft;

        // Get position string for selected square
        const pos = posString(row, col);

        // Make a valid move
        if (currentSquare && moves.includes(pos)) {
          const newBoard = makeMove(board, currentSquare, pos, enPassant);
          draft.board = newBoard;
          draft.lastMove = pos;
          clearSelection(draft);

          // Check for en passant. Reset after making a move
          if (enPassant.pieces.length > 0) {
            draft.enPassant = defaultEnPassantInfo;
          } else {
            draft.enPassant = checkEnPassant(board, currentSquare, pos, turn);
          }

          // Check for pawn promotion
          if (needPromotion(newBoard, pos, turn)) {
            draft.needPromotion = true;
            return;
          }

          swapTurn(draft);
          return;
        }

        // Must not select an empty square
        const square = board[row][col];
        if (!square) {
          if (currentSquare) {
            clearSelection(draft);
          }
          return;
        }

        // Must select pieces with correct color
        const [pieceColor] = square;
        if (pieceColor !== turn) {
          if (currentSquare) {
            clearSelection(draft);
          }
          return;
        }

        // Click the same piece twice
        if (currentSquare === pos) {
          clearSelection(draft);
          return;
        }

        draft.currentSquare = pos;

        // Get valid moves for the piece
        const validMoves = getMoves(board, row, col, turn, enPassant);
        draft.moves = validMoves;

        // Highlight current square and valid moves
        draft.squaresToHighlight = [pos, ...validMoves];
      });

    case ACTIONS.PROMOTE:
      return produce(state, (draft) => {
        const { piece } = action;
        const { board, lastMove, turn } = draft;

        const promotedPiece: Piece = `${turn}${piece}`;
        const newBoard = updateBoard(
          board,
          lastMove as SquarePos,
          promotedPiece
        );

        draft.board = newBoard;
        draft.needPromotion = false;
        swapTurn(draft);
      });

    default:
      return state;
  }
};

export { initialState, reducer };
export type { GameState };
