import { Player } from "../types";
import { MESSAGE } from "../constants/messages";
import { socket } from "../utils/socket";
import { showSingleToast } from "../utils/toast";

type Props = {
  roomId: string;
  opponent?: Player;
};

export default function Controls({ roomId, opponent }: Props) {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    showSingleToast("roomIdCopied", MESSAGE.roomIdCopied);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  const requestReset = () => {
    socket.emit("resetRequest", roomId);
    if (opponent) {
      showSingleToast("resetRequest", MESSAGE.resetRequested);
    }
  };

  return (
    <div className="controls">
      <button onClick={copyRoomId}>Room ID</button>
      <button onClick={requestReset}>Reset</button>
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
}
