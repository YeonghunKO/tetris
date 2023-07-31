import React from "react";
import { useGameOver } from "../hooks/useGameOver";
import { Menu } from "./Menu";
import { Tetris } from "./Tetris";

export const Game = ({ rows, columns }: { rows: number; columns: number }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Game">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};
