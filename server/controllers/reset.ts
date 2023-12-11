import { Server, Socket } from "socket.io";
import { getPlayers, resetRoom, searchRoomById } from "../utils/room";

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
      socket.emit("resetAccepted", room);
      return;
    }

    // Ask for the other player's acceptance
    room.resetPending = true;
    io.to(otherPlayer.id).emit("resetRequest");
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
  socket.emit("resetAccepted", room);
  if (otherPlayer) {
    io.to(otherPlayer.id).emit("resetAccepted", room);
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
    io.to(otherPlayer.id).emit("resetRejected");
  }
};

export { resetRequestHandler, acceptResetHandler, rejectResetHandler };
