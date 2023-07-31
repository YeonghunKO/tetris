import { useState } from "react";
import { Game } from "./components/Game";
import { useGameOver } from "./hooks/useGameOver";

function App() {
  return (
    <div className="App">
      <Game rows={20} columns={20} />
    </div>
  );
}

export default App;
