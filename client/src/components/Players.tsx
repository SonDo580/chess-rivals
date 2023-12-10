import { useEffect } from "react";
import { toast } from "react-toastify";

import { Player } from "../types";
import { getTurnDisplay } from "../utils/game";
import PlayerDisplay from "./PlayerDisplay";

type Props = {
  allowMove: boolean;
  player?: Player;
  opponent?: Player;
};

function Players({ allowMove, player, opponent }: Props) {
  useEffect(() => {
    toast(getTurnDisplay(allowMove));
  }, []);

  return (
    <div className="players">
      <div>
        You: <PlayerDisplay player={player} />
      </div>
      <div>
        Opponent: <PlayerDisplay player={opponent} />
      </div>
    </div>
  );
}

export default Players;
