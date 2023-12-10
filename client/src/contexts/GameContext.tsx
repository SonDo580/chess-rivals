import { ReactNode, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Room } from "../types";
import { socket } from "../utils/socket";
import { MESSAGE } from "../constants/messages";
import { initialState, reducer } from "./GameReducer";
import { ActionType } from "./GameActions";

const GameContext = createContext(initialState);

type ProviderProps = {
  children: ReactNode;
};

function GameProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const initRoom = (roomInfo: Room) => {
    dispatch({ type: ActionType.INIT_ROOM, roomInfo });
  };

  const resetRoom = () => {
    dispatch({ type: ActionType.RESET_ROOM });
  };

  useEffect(() => {
    const roomInitHandler = (roomInfo: Room) => {
      initRoom(roomInfo);
      navigate("/game");
    };

    const opponentJoinedHandler = (roomInfo: Room) => {
      initRoom(roomInfo);
      toast(MESSAGE.opponentJoined);
    };

    const roomLeavedHandler = () => {
      resetRoom();
      navigate("/");
    };

    const opponentLeavedHandler = (roomInfo: Room) => {
      initRoom(roomInfo);
      toast(MESSAGE.opponentLeaved);
    };

    socket.on("initRoom", roomInitHandler);
    socket.on("opponentJoined", opponentJoinedHandler);
    socket.on("roomLeaved", roomLeavedHandler);
    socket.on("opponentLeaved", opponentLeavedHandler);

    return () => {
      socket.off("initRoom", roomInitHandler);
      socket.off("opponentJoined", opponentJoinedHandler);
      socket.off("roomLeaved", roomLeavedHandler);
      socket.off("opponentLeaved", opponentLeavedHandler);
    };
  }, []);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
}

export { GameContext, GameProvider };
