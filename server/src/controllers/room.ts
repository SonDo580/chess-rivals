import { Server, Socket } from "socket.io";

import { Color } from "../constants";
import {
  addRoom,
  createRoom,
  createPlayer,
  searchRoomById,
  removePlayer,
  deleteRoom,
  searchRoomByPlayer,
  resetColor,
  resetRoom,
} from "../utils/room";
import { ServerEventName } from "@/constants/event";

const createRoomHandler = (socket: Socket) => (playerName: string) => {
  // Validate player's name
  if (playerName.trim() === "") {
    socket.emit(ServerEventName.NAME_ERROR);
    return;
  }

  // Create new room with 1 player
  const firstPlayer = createPlayer(socket.id, playerName, Color.WHITE);
  const room = createRoom(firstPlayer);
  addRoom(room);

  // Notice the player
  socket.emit(ServerEventName.INIT_ROOM, room);
};

const joinRoomHandler =
  (socket: Socket, io: Server) => (playerName: string, roomId: string) => {
    // Validate player's name
    if (playerName.trim() === "") {
      socket.emit(ServerEventName.NAME_ERROR);
      return;
    }

    // Validate roomId
    if (roomId === "") {
      socket.emit(ServerEventName.ROOM_ID_EMPTY);
      return;
    }

    // Check if the room exists
    const room = searchRoomById(roomId);
    if (!room) {
      socket.emit(ServerEventName.ROOM_NOT_EXISTS);
      return;
    }

    // Check if there are enough players
    if (room.players.length === 2) {
      socket.emit(ServerEventName.ROOM_FULL);
      return;
    }

    // Add this player as second player
    const secondPlayer = createPlayer(socket.id, playerName, Color.BLACK);
    room.players.push(secondPlayer);

    // Notice both players
    socket.emit(ServerEventName.INIT_ROOM, room);
    const firstPlayerId = room.players[0].id;
    io.to(firstPlayerId).emit(ServerEventName.OPPONENT_JOINED, room);
  };

const leaveRoomHandler = (socket: Socket, io: Server) => (roomId: string) => {
  // Find the room
  const room = searchRoomById(roomId);

  // Remove player from room and notice him/her
  const playerId = socket.id;
  removePlayer(room, playerId);
  socket.emit(ServerEventName.ROOM_LEAVED);

  // Remove room if there's no players left
  if (room.players.length === 0) {
    deleteRoom(room);
    return;
  }

  // Reset room state
  resetRoom(room);

  // Assign White for the other player (if needed)
  const otherPlayer = room.players[0];
  resetColor(otherPlayer);

  // Notice the other player
  io.to(otherPlayer.id).emit(ServerEventName.OPPONENT_LEAVED, room);
};

const disconnectHandler = (socket: Socket, io: Server) => () => {
  // Find this player's room
  const playerId = socket.id;
  const room = searchRoomByPlayer(playerId);

  // Do nothing if player hasn't joined any room
  if (!room) {
    return;
  }

  // Remove player from room
  removePlayer(room, playerId);

  // Remove room if there's no players left
  if (room.players.length === 0) {
    deleteRoom(room);
    return;
  }

  // Reset room state
  resetRoom(room);

  // Assign White for the other player (if needed)
  const otherPlayer = room.players[0];
  resetColor(otherPlayer);

  // Notice the other player
  io.to(otherPlayer.id).emit(ServerEventName.OPPONENT_LEAVED, room);
};

export {
  createRoomHandler,
  joinRoomHandler,
  leaveRoomHandler,
  disconnectHandler,
};
