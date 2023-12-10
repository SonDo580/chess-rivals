import { Player } from "../types";
import { socket } from "./socket";

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

export { getPlayerRoles, getTurnDisplay };
