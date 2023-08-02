import { Game } from "@/components/Tetris/Game/Game";

function App() {
  return (
    <div className="App">
      <Game rows={20} columns={10} />
    </div>
  );
}

export default App;
