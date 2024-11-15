import { ServerEventName } from "@/constants/event";
import { Room } from "@/types";
import { getPlayers } from "@/utils/room";
import { Server, Socket } from "socket.io";

interface NotifyPlayerParams<T> {
  eventName: ServerEventName;
  data?: T;
}

interface NotifyBothPlayersParams<T, K> extends NotifyPlayerParams<T> {
  room: Room;
  otherEventName: ServerEventName;
  otherData?: K;
}

export class NotificationService {
  constructor(private readonly socket: Socket, private readonly io: Server) {}

  /* Notify both players in the room */
  public notifyPlayers<T, K>({
    eventName,
    data,
    otherEventName,
    otherData,
    room,
  }: NotifyBothPlayersParams<T, K>) {
    this.notifyCurrentPlayer({ eventName, data });
    this.notifyOtherPlayer(
      {
        eventName: otherEventName,
        data: otherData,
      },
      room
    );
  }

  /* Notify the current player */
  public notifyCurrentPlayer<T>({ eventName, data }: NotifyPlayerParams<T>) {
    this.socket.emit(eventName, data);
  }

  /* Notify the other player if they joined */
  private notifyOtherPlayer<T>(
    { eventName, data }: NotifyPlayerParams<T>,
    room: Room
  ) {
    const currentPlayerId = this.socket.id;
    const { otherPlayer } = getPlayers(room, currentPlayerId);

    if (otherPlayer) {
      this.io.to(otherPlayer.id).emit(eventName, data);
    }
  }
}
