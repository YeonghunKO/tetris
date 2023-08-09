import { useGameOver } from "@/hooks/useGameOver";
import { Suspense, lazy } from "react";

const Menu = lazy(() => import("../Menu/Menu.js"));
const Tetris = lazy(() => import("../Tetris.js"));

export const Game = ({ rows, columns }: { rows: number; columns: number }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Game">
      <Suspense fallback={<div>...loading</div>}>
        {gameOver ? (
          <Menu onClick={start} />
        ) : (
          <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
        )}
      </Suspense>
    </div>
  );
};
