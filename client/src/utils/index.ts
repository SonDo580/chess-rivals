import { BLACK, PAWN, WHITE, defaultEnPassantInfo } from "../constants";
import { Board, Color, EnPassantInfo, SquarePos } from "../types";

const validRow = (row: number) => row >= 0 && row < 8;

const validCol = (col: number) => col >= 0 && col < 8;

const onBoard = (row: number, col: number) => validRow(row) && validCol(col);

const posString = (row: number, col: number): SquarePos => `${row}-${col}`;

const posParse = (pos: SquarePos): [number, number] => {
  const [row, col] = pos.split("-");
  return [Number(row), Number(col)];
};

const shouldHighlight = (
  squaresToHighlight: SquarePos[],
  row: number,
  col: number
) => squaresToHighlight.includes(posString(row, col));

const isLastMove = (lastMove: SquarePos | "", row: number, col: number) =>
  lastMove === posString(row, col);

const needPromotion = (board: Board, lastMove: SquarePos, turn: Color) => {
  const [row, col] = posParse(lastMove);

  const square = board[row][col];
  if (!square) {
    return false;
  }

  const [pieceColor, pieceSymbol] = square;
  if (pieceSymbol !== PAWN || pieceColor !== turn) {
    return false;
  }

  return (turn === WHITE && row === 0) || (turn === BLACK && row === 7);
};

const checkEnPassant = (
  board: Board,
  from: SquarePos,
  to: SquarePos,
  turn: Color
): EnPassantInfo => {
  const [fromRow, fromCol] = posParse(from);
  const [toRow] = posParse(to);
  const square = board[fromRow][fromCol];
  if (!square) {
    return defaultEnPassantInfo;
  }

  const [pieceColor, pieceSymbol] = square;
  if (pieceColor !== turn || pieceSymbol !== PAWN) {
    return defaultEnPassantInfo;
  }

  const pieces: SquarePos[] = [];
  // Check if the pawn moved 2 rows (only happen from initial position)
  if (Math.abs(fromRow - toRow) === 2) {
    // Check 2 squares next to 'to' for opponent's pawns
    for (const colOffset of [-1, 1]) {
      const destCol = fromCol + colOffset;
      if (!validCol(destCol)) {
        continue;
      }

      const square = board[toRow][destCol];
      if (!square) {
        continue;
      }

      const [pieceColor, pieceSymbol] = square;
      if (pieceColor !== turn && pieceSymbol === PAWN) {
        pieces.push(posString(toRow, destCol));
      }
    }

    // Check if en passant can be performed
    if (pieces.length > 0) {
      return {
        move: posString((fromRow + toRow) / 2, fromCol),
        pieces,
      };
    }
  }

  return defaultEnPassantInfo;
};

export {
  onBoard,
  validRow,
  validCol,
  posString,
  posParse,
  shouldHighlight,
  isLastMove,
  needPromotion,
  checkEnPassant,
};
