import { Server, Socket } from "socket.io";

import { Color } from "@/constants";
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
} from "@/utils/room";
import { ServerEventName } from "@/constants/event";
import { NotificationService } from "@/services/notification.service";

export class RoomController {
  private readonly currentPlayerId: string;
  private readonly notificationService: NotificationService;

  constructor(socket: Socket, io: Server) {
    this.currentPlayerId = socket.id;
    this.notificationService = new NotificationService(socket, io);
  }

  public createRoomHandler(playerName: string) {
    // Validate player's name
    if (playerName.trim() === "") {
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.NAME_ERROR,
      });
      return;
    }

    // Create new room with 1 player
    const firstPlayer = createPlayer(
      this.currentPlayerId,
      playerName,
      Color.WHITE
    );
    const room = createRoom(firstPlayer);
    addRoom(room);

    this.notificationService.notifyCurrentPlayer({
      eventName: ServerEventName.INIT_ROOM,
      data: room,
    });
  }

  public joinRoomHandler(playerName: string, roomId: string) {
    // Validate player's name
    if (playerName.trim() === "") {
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.NAME_ERROR,
      });
      return;
    }

    // Validate roomId
    if (roomId === "") {
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.ROOM_ID_EMPTY,
      });
      return;
    }

    // Check if the room exists
    const room = searchRoomById(roomId);
    if (!room) {
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.ROOM_NOT_EXISTS,
      });
      return;
    }

    // Check if there are enough players
    if (room.players.length === 2) {
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.ROOM_FULL,
      });
      return;
    }

    // Add current player as second player
    const secondPlayer = createPlayer(
      this.currentPlayerId,
      playerName,
      Color.BLACK
    );
    room.players.push(secondPlayer);

    // Notify current player
    this.notificationService.notifyCurrentPlayer({
      eventName: ServerEventName.INIT_ROOM,
      data: room,
    });

    // Notify the other player
    const firstPlayerId = room.players[0].id;
    this.notificationService.notifyPlayerById(
      {
        eventName: ServerEventName.OPPONENT_JOINED,
        data: room,
      },
      firstPlayerId
    );
  }

  public leaveRoomHandler(roomId: string) {
    const room = searchRoomById(roomId);

    // Remove current player from room
    removePlayer(room, this.currentPlayerId);

    // Notify current player
    this.notificationService.notifyCurrentPlayer({
      eventName: ServerEventName.ROOM_LEAVED,
    });

    // Remove the room if there's no players left
    if (room.players.length === 0) {
      deleteRoom(room);
      return;
    }

    // Reset room state
    resetRoom(room);

    // Assign White for the remaining player (if they are Black)
    const otherPlayer = room.players[0];
    resetColor(otherPlayer);

    // Notify the remaining player
    this.notificationService.notifyPlayerById(
      {
        eventName: ServerEventName.OPPONENT_LEAVED,
        data: room,
      },
      otherPlayer.id
    );
  }

  public disconnectHandler() {
    // Find current player's room
    const room = searchRoomByPlayer(this.currentPlayerId);

    // Do nothing if the player hasn't joined any room
    if (!room) {
      return;
    }

    // Remove player from room
    removePlayer(room, this.currentPlayerId);

    // Remove room if there's no players left
    if (room.players.length === 0) {
      deleteRoom(room);
      return;
    }

    // Reset room state
    resetRoom(room);

    // Assign White for the remaining player (if they're Black)
    const otherPlayer = room.players[0];
    resetColor(otherPlayer);

    // Notify the remaining player
    this.notificationService.notifyPlayerById(
      {
        eventName: ServerEventName.OPPONENT_LEAVED,
        data: room,
      },
      otherPlayer.id
    );
  }
}
