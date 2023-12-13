import { Color, ResultKind } from "../constants";
import { Player, SquarePos } from "../types";
import { socket } from "./socket";

const posString = (row: number, col: number): SquarePos => `${row}-${col}`;

const shouldHighlight = (
  squaresToHighlight: SquarePos[],
  row: number,
  col: number,
  allowMove: boolean
) => allowMove && squaresToHighlight.includes(posString(row, col));

type GetPlayerRolesReturnType = {
  player?: Player;
  opponent?: Player;
};

const getPlayerRoles = (players: Player[]): GetPlayerRolesReturnType =>
  players.reduce((acc, player) => {
    if (socket.id === player.id) {
      return { ...acc, player };
    } else {
      return { ...acc, opponent: player };
    }
  }, {});

const getTurnDisplay = (allowMove: boolean) =>
  allowMove ? "Your turn" : "Opponent's turn";

const getResultMessage = (resultKind: ResultKind, winner?: Color) => {
  if (resultKind === ResultKind.CHECKMATE) {
    const winnerDisplay = winner === Color.BLACK ? "BLACK" : "WHITE";
    return `${resultKind}! ${winnerDisplay} won!`;
  } else {
    return `${resultKind}!`;
  }
};

export {
  posString,
  shouldHighlight,
  getPlayerRoles,
  getTurnDisplay,
  getResultMessage,
};
