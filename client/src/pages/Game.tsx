import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { PromotePieceSymbol } from "../types";
import { getPlayerRoles } from "../utils";
import { socket } from "../utils/socket";
import { Color } from "../constants";
import { MESSAGE } from "../constants/messages";

import { GameContext } from "../contexts/GameContext";
import Board from "../components/Board";
import Controls from "../components/Controls";
import Players from "../components/Players";
import Promote from "../components/Promote";
import Modal from "../components/Modal";
import { getResultMessage } from "../utils";

export default function Game() {
  const navigate = useNavigate();
  const {
    id: roomId,
    players,
    turn,
    needPromotion,
    result = {},
  } = useContext(GameContext);
  const [resetPopupVisible, setResetPopupVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const { kind: resultKind, winner } = result;

  useEffect(() => {
    if (resultKind) {
      setResultVisible(true);
    }
  }, [resultKind]);

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

  const hideResult = () => {
    setResultVisible(false);
  };

  return (
    <>
      <Players allowMove={allowMove} player={player} opponent={opponent} />
      <Board allowMove={allowMove} flip={player!.color === Color.BLACK} />
      <Controls roomId={roomId} opponent={opponent} />
      {showPromote && <Promote handlePromote={handlePromote} />}
      {resetPopupVisible && (
        <Modal
          message={MESSAGE.resetQuestion}
          onOk={acceptReset}
          onCancel={rejectReset}
        />
      )}
      {resultVisible && (
        <Modal
          message={getResultMessage(resultKind!, winner)}
          okText="Close"
          onOk={hideResult}
        />
      )}
    </>
  );
}
