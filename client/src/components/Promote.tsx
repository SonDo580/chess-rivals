import { PieceSymbol } from "../constants";
import { PromotePieceSymbol } from "../types";

type Props = {
  handlePromote: (piece: PromotePieceSymbol) => void;
};

function Promote({ handlePromote }: Props) {
  return (
    <div className="overlay">
      <div className="promote">
        <h1>Promote to</h1>
        <div className="options">
          <button onClick={() => handlePromote(PieceSymbol.QUEEN)}>
            Queen
          </button>
          <button onClick={() => handlePromote(PieceSymbol.ROOK)}>Rook</button>
          <button onClick={() => handlePromote(PieceSymbol.BISHOP)}>
            Bishop
          </button>
          <button onClick={() => handlePromote(PieceSymbol.KNIGHT)}>
            Knight
          </button>
        </div>
      </div>
    </div>
  );
}

export default Promote;
