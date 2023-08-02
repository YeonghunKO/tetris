import React from "react";
import "./Tetris.css";
import { useGameStats } from "@/hooks/useGameStats";
import { usePlayer } from "@/hooks/usePlayer";
import { useBoard } from "@/hooks/useBoard";
import Board from "@/components/Tetris/Board";
import Previews from "./Previews";
import GameStats from "@/components/Tetris/Game/Stats";
import ArrowKeys from "./ArrowKeys/ArrowKeys";

const Tetris = ({
  rows,
  columns,
  setGameOver,
}: {
  rows: number;
  columns: number;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [gameStats, addLinesCleared] = useGameStats(); // 게임 진행 상황 (레벨, 다음 레빌까지 클리어해야될 라인..)
  const [player, setPlayer, resetPlayer] = usePlayer(); // 지금 충돌했는지, 어떤 블록을 컨트롤하는지, 블록의 위치는 어디에 있는지
  const [board] = useBoard({
    addLinesCleared,
    rows,
    columns,
    player,
    resetPlayer,
  }); // 실시간 보여지는 전체 보드의 정보를 갱신

  // console.log("gaemStats", gaemStats);
  // console.log("player", player);
  // console.log("board", board);

  return (
    <div className="Tetris">
      <Board board={board} />
      <div>
        <Previews tetrominoes={player.tetrominoes} />
        <GameStats gameStats={gameStats} />
        <ArrowKeys />
      </div>
    </div>
  );
};

export default Tetris;
