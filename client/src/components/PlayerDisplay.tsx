import { Player } from "../types";
import { MESSAGE } from "../constants/messages";
import { Color } from "../constants";
// import { Color, PieceSymbol } from "../constants";
// import Piece from "./Piece";

type Props = {
  player?: Player;
};

function PlayerDisplay({ player }: Props) {
  if (!player) {
    return <span>{MESSAGE.waiting}</span>;
  }

  return (
    <div className="player">
      <span>
        {player.color === Color.WHITE ? "White - " : "Black - "}
        {/* <Piece square={`${player.color}${PieceSymbol.KING}`} /> */}
      </span>
      <span>{player.name}</span>
    </div>
  );
}

export default PlayerDisplay;
