import { Server, Socket } from "socket.io";

import { getPlayers, resetRoom, searchRoomById } from "@/utils/room";
import { ServerEventName } from "@/constants/event";
import { NotificationService } from "@/services/notification.service";

export class ResetController {
  private readonly currentPlayerId: string;
  private readonly notificationService: NotificationService;

  constructor(socket: Socket, io: Server) {
    this.currentPlayerId = socket.id;
    this.notificationService = new NotificationService(socket, io);
  }

  public resetRequestHandler(roomId: string) {
    const room = searchRoomById(roomId);

    // Check if there's already a reset request
    if (room.resetPending) {
      return;
    }

    // Allow reset if there's only current player
    const { otherPlayer } = getPlayers(room, this.currentPlayerId);
    if (!otherPlayer) {
      resetRoom(room);

      // Notify current player
      this.notificationService.notifyCurrentPlayer({
        eventName: ServerEventName.ROOM_UPDATED,
        data: room,
      });

      return;
    }

    // Ask for the other player's acceptance
    room.resetPending = true;
    this.notificationService.notifyOtherPlayer(
      {
        eventName: ServerEventName.RESET_REQUEST,
        data: room,
      },
      room
    );
  }

  public acceptResetHandler(roomId: string) {
    const room = searchRoomById(roomId);
    if (!room) {
      return;
    }

    resetRoom(room);

    // Notify both players
    this.notificationService.notifyPlayers({
      eventName: ServerEventName.ROOM_UPDATED,
      data: room,
      otherEventName: ServerEventName.ROOM_UPDATED,
      otherData: room,
      room,
    });
  }

  public rejectResetHandler(roomId: string) {
    const room = searchRoomById(roomId);

    // Notify the other player
    room.resetPending = false;
    this.notificationService.notifyOtherPlayer(
      {
        eventName: ServerEventName.RESET_REQUEST,
        data: room,
      },
      room
    );
  }
}
