import { BISHOP, KNIGHT, QUEEN, ROOK } from "../constants";
import { PieceSymbol } from "../types";

type Props = {
  handlePromote: (piece: PieceSymbol) => void;
};

function Promote({ handlePromote }: Props) {
  return (
    <div className="overlay">
      <div className="promote">
        <h1>Promote to</h1>
        <div className="options">
          <button onClick={() => handlePromote(QUEEN)}>Queen</button>
          <button onClick={() => handlePromote(ROOK)}>Rook</button>
          <button onClick={() => handlePromote(BISHOP)}>Bishop</button>
          <button onClick={() => handlePromote(KNIGHT)}>Knight</button>
        </div>
      </div>
    </div>
  );
}

export default Promote;
