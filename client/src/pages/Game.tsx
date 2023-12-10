import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../contexts/GameContext";
import { getPlayerRoles } from "../utils/game";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Players from "../components/Players";

export default function Game() {
  const navigate = useNavigate();
  const { id: roomId, players, turn } = useContext(GameContext);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
  }, [roomId]);

  if (!roomId) {
    return null;
  }

  const { player, opponent } = getPlayerRoles(players!);
  const allowMove = player!.color === turn;

  return (
    <>
      <Players allowMove={allowMove} player={player} opponent={opponent} />
      <Board />
      <Controls roomId={roomId} />
    </>
  );
}
