import { MESSAGE } from "../constants/messages";
import { showSingleToast } from "../utils/toast";

type Props = {
  roomId: string;
};

export default function Controls({ roomId }: Props) {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    showSingleToast("roomIdCopied", MESSAGE.roomIdCopied);
  };

  return (
    <div className="controls">
      <button className="button" onClick={copyRoomId}>
        Room ID
      </button>
    </div>
  );
}
