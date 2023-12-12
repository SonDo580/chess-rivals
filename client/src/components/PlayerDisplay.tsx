import { Player } from "../types";
import { MESSAGE } from "../constants/messages";
import { Color } from "../constants";

type Props = {
  player?: Player;
};

function PlayerDisplay({ player }: Props) {
  if (!player) {
    return <span>{MESSAGE.waiting}</span>;
  }

  return (
    <div className="player">
      <span>{player.name} </span>
      <span className="color">
        ({player.color === Color.WHITE ? "White" : "Black"})
      </span>
    </div>
  );
}

export default PlayerDisplay;
