import { useEffect, useState } from "react";
import { buildBoard, nextBoard } from "@/business/Board";

interface UseBoardProps {
  rows: number;
  columns: number;
  player: any;
  resetPlayer: () => void;
  addLinesCleared: (lines: number) => void;
}

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}: UseBoardProps) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared,
      })
    );
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
