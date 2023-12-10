import { MESSAGE } from "../constants/messages";
import { socket } from "../utils/socket";
import { showSingleToast } from "../utils/toast";

type Props = {
  roomId: string;
};

export default function Controls({ roomId }: Props) {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    showSingleToast("roomIdCopied", MESSAGE.roomIdCopied);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
  };

  return (
    <div className="controls">
      <button className="button" onClick={copyRoomId}>
        Room ID
      </button>
      <button className="button" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
}
