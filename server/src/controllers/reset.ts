import { Server, Socket } from "socket.io";
import { getPlayers, resetRoom, searchRoomById } from "../utils/room";
import { ServerEventName } from "@/constants/event";

const resetRequestHandler =
  (socket: Socket, io: Server) => (roomId: string) => {
    // Find the room
    const room = searchRoomById(roomId);
    if (room.resetPending) {
      return;
    }

    // Find players in the room
    const { otherPlayer } = getPlayers(room, socket.id);

    // Allow reset if there's only 1 player
    if (!otherPlayer) {
      // Reset room state
      resetRoom(room);
      // Notice current player
      socket.emit(ServerEventName.ROOM_UPDATED, room);
      return;
    }

    // Ask for the other player's acceptance
    room.resetPending = true;
    io.to(otherPlayer.id).emit(ServerEventName.RESET_REQUEST);
  };

const acceptResetHandler = (socket: Socket, io: Server) => (roomId: string) => {
  // Find the room
  const room = searchRoomById(roomId);
  if (!room) {
    return;
  }

  // Find players in the room
  const { otherPlayer } = getPlayers(room, socket.id);

  // Reset room state
  resetRoom(room);

  // Notify both players
  socket.emit(ServerEventName.ROOM_UPDATED, room);
  if (otherPlayer) {
    io.to(otherPlayer.id).emit(ServerEventName.ROOM_UPDATED, room);
  }
};

const rejectResetHandler = (socket: Socket, io: Server) => (roomId: string) => {
  // Find the room
  const room = searchRoomById(roomId);
  // Find players in the room
  const { otherPlayer } = getPlayers(room, socket.id);

  // Notify the other player
  room.resetPending = false;
  if (otherPlayer) {
    io.to(otherPlayer.id).emit(ServerEventName.RESET_REJECTED);
  }
};

export { resetRequestHandler, acceptResetHandler, rejectResetHandler };
