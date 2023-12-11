import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../contexts/GameContext";
import { getPlayerRoles } from "../utils/game";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Players from "../components/Players";
import Promote from "../components/Promote";
import { socket } from "../utils/socket";
import { PromotePieceSymbol } from "../types";

export default function Game() {
  const navigate = useNavigate();
  const { id: roomId, players, turn, needPromotion } = useContext(GameContext);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
  }, [navigate, roomId]);

  if (!roomId) {
    return null;
  }

  const { player, opponent } = getPlayerRoles(players!);
  const allowMove = player!.color === turn;

  const handlePromote = (piece: PromotePieceSymbol) => {
    socket.emit("promote", roomId, piece);
  };

  return (
    <>
      <Players allowMove={allowMove} player={player} opponent={opponent} />
      <Board allowMove={allowMove} />
      <Controls roomId={roomId} />
      {allowMove && needPromotion && <Promote handlePromote={handlePromote} />}
    </>
  );
}
