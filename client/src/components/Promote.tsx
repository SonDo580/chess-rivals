import { PieceSymbol } from "../constants";
import { PromotePieceSymbol } from "../types";

type Props = {
  handlePromote: (piece: PromotePieceSymbol) => void;
};

function Promote({ handlePromote }: Props) {
  const promoteToQueen = () => {
    handlePromote(PieceSymbol.QUEEN);
  };
  const promoteToRook = () => {
    handlePromote(PieceSymbol.ROOK);
  };
  const promoteToBishop = () => {
    handlePromote(PieceSymbol.BISHOP);
  };
  const promoteToKnight = () => {
    handlePromote(PieceSymbol.KNIGHT);
  };

  return (
    <div className="overlay">
      <div className="promote">
        <h1>Promote to</h1>

        <div className="options">
          <button onClick={promoteToQueen}>Queen</button>
          <button onClick={promoteToRook}>Rook</button>
          <button onClick={promoteToBishop}>Bishop</button>
          <button onClick={promoteToKnight}>Knight</button>
        </div>
      </div>
    </div>
  );
}

export default Promote;
