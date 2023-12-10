import { v4 as uuid } from "uuid";

import { Player, Room } from "../types";
import { Color } from "../constants";
import {
  defaultCheckInfo,
  defaultEnPassantInfo,
  initialBoard,
  initialCastlingRights,
} from "../constants/default";

const rooms: {
  [index: string]: Room;
} = {};

const createPlayer = (id: string, name: string, color: Color): Player => ({
  id,
  name,
  color,
});

const addRoom = (room: Room) => {
  rooms[room.id] = room;
};

const createRoom = (firstPlayer: Player): Room => ({
  id: uuid(),
  players: [firstPlayer],
  turn: Color.WHITE,
  board: initialBoard,
  currentSquare: "",
  lastMove: "",
  moves: [],
  needPromotion: false,
  enPassant: defaultEnPassantInfo,
  check: defaultCheckInfo,
  castlingRights: initialCastlingRights,
  fiftyMoveCount: 0,
  result: {},
});

const searchRoomById = (roomId: string) => rooms[roomId];

export { createPlayer, createRoom, addRoom, searchRoomById };
