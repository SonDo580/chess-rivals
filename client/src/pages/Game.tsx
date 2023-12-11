import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PromotePieceSymbol } from "../types";
import { socket } from "../utils/socket";
import { getPlayerRoles } from "../utils/game";
import { GameContext } from "../contexts/GameContext";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Players from "../components/Players";
import Promote from "../components/Promote";
import { Color, ResultKind } from "../constants";

export default function Game() {
  const navigate = useNavigate();
  const {
    id: roomId,
    players,
    turn,
    needPromotion,
    result = {},
  } = useContext(GameContext);

  const { kind: resultKind, winner } = result;

  useEffect(() => {
    if (!resultKind) {
      return;
    }

    if (resultKind === ResultKind.CHECKMATE) {
      alert(
        `${resultKind}! ${winner === Color.BLACK ? "Black" : "White"} won!`
      );
    } else {
      alert(`${resultKind}!`);
    }
  }, [resultKind, winner]);

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
  const showPromote = allowMove && needPromotion;

  const handlePromote = (piece: PromotePieceSymbol) => {
    socket.emit("promote", roomId, piece);
  };

  return (
    <>
      <Players allowMove={allowMove} player={player} opponent={opponent} />
      <Board allowMove={allowMove} flip={player!.color === Color.BLACK} />
      <Controls roomId={roomId} />
      {showPromote && <Promote handlePromote={handlePromote} />}
    </>
  );
}
