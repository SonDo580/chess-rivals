import "./App.scss";
import { GameProvider } from "./contexts/GameContext";
import Board from "./components/Board";

function App() {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
}

export default App;
