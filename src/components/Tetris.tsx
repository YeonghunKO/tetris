import React from "react";
import "./Tetris.css";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

export const Tetris = ({
  rows,
  columns,
  setGameOver,
}: {
  rows: number;
  columns: number;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [gaemStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();

  console.log("gaemStats", gaemStats);
  console.log("player", player);

  return <div>Tetris</div>;
};
