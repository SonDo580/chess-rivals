import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { PromotePieceSymbol } from "../types";
import { socket } from "../utils/socket";
import { getPlayerRoles } from "../utils/game";
import { Color, ResultKind } from "../constants";
import { MESSAGE } from "../constants/messages";

import { GameContext } from "../contexts/GameContext";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Players from "../components/Players";
import Promote from "../components/Promote";
import Confirm from "../components/Confirm";

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
  const [resetPopupVisible, setResetPopupVisible] = useState(false);

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
    const resetRequestHandler = () => {
      setResetPopupVisible(true);
    };
    const resetRejectedHandler = () => {
      toast(MESSAGE.resetRejected);
    };

    socket.on("resetRequest", resetRequestHandler);
    socket.on("resetRejected", resetRejectedHandler);

    return () => {
      socket.off("resetRequest", resetRequestHandler);
      socket.off("resetRejected", resetRejectedHandler);
    };
  }, []);

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

  const acceptReset = () => {
    socket.emit("acceptReset", roomId);
    setResetPopupVisible(false);
  };

  const rejectReset = () => {
    socket.emit("rejectReset", roomId);
    setResetPopupVisible(false);
  };

  return (
    <>
      <Players allowMove={allowMove} player={player} opponent={opponent} />
      <Board allowMove={allowMove} flip={player!.color === Color.BLACK} />
      <Controls roomId={roomId} opponent={opponent} />
      {showPromote && <Promote handlePromote={handlePromote} />}
      {resetPopupVisible && (
        <Confirm
          question={MESSAGE.resetQuestion}
          onOk={acceptReset}
          onCancel={rejectReset}
        />
      )}
    </>
  );
}
