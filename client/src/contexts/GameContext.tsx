import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { GameState, initialState, reducer } from "./GameReducer";
import { GameAction } from "./GameActions";

type ContextValue = [GameState, Dispatch<GameAction>];

const GameContext = createContext<ContextValue>([initialState, () => {}]);

type ProviderProps = {
  children: ReactNode;
};

function GameProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
