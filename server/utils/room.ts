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

const resetRoom = (room: Room) => {
  room.turn = Color.WHITE;
  room.board = initialBoard;
  room.currentSquare = "";
  room.lastMove = "";
  room.moves = [];
  room.needPromotion = false;
  room.enPassant = defaultEnPassantInfo;
  room.check = defaultCheckInfo;
  room.castlingRights = initialCastlingRights;
  room.fiftyMoveCount = 0;
  room.result = {};
};

const searchRoomById = (roomId: string) => rooms[roomId];

const searchRoomByPlayer = (playerId: string) => {
  return Object.values(rooms).find((room) =>
    room.players.some((player) => player.id === playerId)
  );
};

const deleteRoom = (room: Room) => {
  delete rooms[room.id];
};

const createPlayer = (id: string, name: string, color: Color): Player => ({
  id,
  name,
  color,
});

const removePlayer = (room: Room, playerId: string) => {
  room.players = room.players.filter((player) => player.id !== playerId);
};

const resetColor = (player: Player) => {
  if (player.color === Color.BLACK) {
    player.color = Color.WHITE;
  }
};

export {
  createRoom,
  resetRoom,
  addRoom,
  searchRoomById,
  searchRoomByPlayer,
  deleteRoom,
  removePlayer,
  createPlayer,
  resetColor,
};
