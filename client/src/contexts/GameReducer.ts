import { produce } from "immer";

import { BLACK, WHITE } from "../constants";
import {
  Board,
  CastlingRights,
  CheckInfo,
  Color,
  EnPassantInfo,
  SquarePos,
} from "../types";
import { getMoves, makeMove, updateBoard } from "../moves";
import { getAttackedKing } from "../attacks";
import { getOpponentColor, getPiece, posString } from "../utils";
import { checkEnPassant, needPromotion } from "../utils/pawn";

import { ACTIONS, GameAction } from "./GameActions";
import { updateCastlingRight } from "../utils/king";

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
  check: CheckInfo;
  castlingRights: CastlingRights;
};

const defaultEnPassantInfo: EnPassantInfo = { move: "", pieces: [] };
const defaultCheckInfo: CheckInfo = { king: null, attacks: [] };

const initialCastlingRights: CastlingRights = {
  [BLACK]: {
    q: true,
    k: true,
  },
  [WHITE]: {
    q: true,
    k: true,
  },
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
  check: defaultCheckInfo,
  castlingRights: initialCastlingRights,
};

const clearSelection = (draft: GameState) => {
  draft.currentSquare = "";
  draft.moves = [];
  draft.squaresToHighlight = [];
};

const checkAttacks = (draft: GameState) => {
  const { board, turn } = draft;
  draft.check.king = getAttackedKing(board, turn);
};

const swapTurn = (draft: GameState) => {
  draft.turn = getOpponentColor(draft.turn);
};

const reducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case ACTIONS.SELECT_SQUARE:
      // first click shows possible moves
      // second click selects a move
      return produce(state, (draft) => {
        const { row, col } = action;
        const { turn, board, currentSquare, moves, enPassant } = draft;
        const castlingRight = draft.castlingRights[turn];

        // Get position string for selected square
        const pos = posString(row, col);

        // Make a valid move
        if (currentSquare && moves.includes(pos)) {
          const newBoard = makeMove(
            board,
            currentSquare,
            pos,
            enPassant,
            castlingRight
          );
          draft.board = newBoard;
          draft.lastMove = pos;
          clearSelection(draft);

          // The current king should not be in danger now. Reset 'check'
          checkAttacks(draft);

          // Update castling right for current player
          // Skip if castling right has been removed for both side
          if (castlingRight.q || castlingRight.k) {
            draft.castlingRights[turn] = updateCastlingRight(
              newBoard,
              currentSquare,
              castlingRight
            );
          }

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

          // Swap turn and check if the opponent king is under attack
          swapTurn(draft);
          checkAttacks(draft);
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
        const validMoves = getMoves(
          board,
          row,
          col,
          turn,
          enPassant,
          draft.castlingRights[turn]
        );
        draft.moves = validMoves;

        // Highlight current square and valid moves
        draft.squaresToHighlight = [pos, ...validMoves];
      });

    case ACTIONS.PROMOTE:
      return produce(state, (draft) => {
        const { piece } = action;
        const { board, lastMove, turn } = draft;

        const promotedPiece = getPiece(turn, piece);
        const newBoard = updateBoard(
          board,
          lastMove as SquarePos,
          promotedPiece
        );

        draft.board = newBoard;
        draft.needPromotion = false;

        // Swap turn and check if the opponent king is under attack
        swapTurn(draft);
        checkAttacks(draft);
      });

    default:
      return state;
  }
};

export { initialState, reducer, defaultEnPassantInfo };
export type { GameState };
