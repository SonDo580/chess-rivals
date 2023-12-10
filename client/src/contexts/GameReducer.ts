import { Room } from "../types";
import { ActionType, ReducerAction } from "./GameActions";

const initialState: Room = {};

const reducer = (state: Room, action: ReducerAction) => {
  switch (action.type) {
    case ActionType.INIT_ROOM:
      return action.roomInfo;

    case ActionType.RESET_ROOM:
      return initialState;

    default:
      return state;
  }
};

export { initialState, reducer };
