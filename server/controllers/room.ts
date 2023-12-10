import { Server, Socket } from "socket.io";

import { Color } from "../constants";
import {
  addRoom,
  createRoom,
  createPlayer,
  searchRoomById,
} from "../utils/room";

const createRoomHandler = (socket: Socket) => (playerName: string) => {
  // Validate player's name
  if (playerName.trim() === "") {
    socket.emit("nameError");
    return;
  }

  // Create new room with 1 player
  const firstPlayer = createPlayer(socket.id, playerName, Color.WHITE);
  const room = createRoom(firstPlayer);
  addRoom(room);

  // Notice the player
  socket.emit("initRoom", room);
};

const joinRoomHandler =
  (socket: Socket, io: Server) => (playerName: string, roomId: string) => {
    // Validate player's name
    if (playerName.trim() === "") {
      socket.emit("nameError");
      return;
    }

    // Validate roomId
    if (roomId === "") {
      socket.emit("roomIdEmpty");
      return;
    }

    // Check if the room exists
    const room = searchRoomById(roomId);
    if (!room) {
      socket.emit("roomNotExists");
      return;
    }

    // Check if there are enough players
    if (room.players.length === 2) {
      socket.emit("roomFull");
      return;
    }

    // Add this player as second player
    const secondPlayer = createPlayer(socket.id, playerName, Color.BLACK);
    room.players.push(secondPlayer);

    // Notice both players
    socket.emit("initRoom", room);
    const firstPlayerId = room.players[0].id;
    io.to(firstPlayerId).emit("opponentJoined", room);
  };

export { createRoomHandler, joinRoomHandler };
