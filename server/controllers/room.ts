import { Socket } from "socket.io";

import { Color } from "../constants";
import { addRoom, createRoom, createPlayer } from "../utils/room";

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
  socket.emit("roomCreated", room);
};

export { createRoomHandler };
