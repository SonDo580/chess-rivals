import { Room } from "../types";

enum ActionType {
  INIT_ROOM = "INIT_ROOM",
  RESET_ROOM = "RESET_ROOM",
}

type InitRoomAction = {
  type: ActionType.INIT_ROOM;
  roomInfo: Room;
};

type ResetRoomAction = {
  type: ActionType.RESET_ROOM;
};

type ReducerAction = InitRoomAction | ResetRoomAction;

export { ActionType };
export type { ReducerAction };
