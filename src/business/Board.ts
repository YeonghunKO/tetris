import type { BuildPlayer, IBuildPlayerReturn } from "../hooks/usePlayer";
import { defaultCell } from "./Cell";

interface NextBoardProps {
  board: any;
  player: IBuildPlayerReturn;
  resetPlayer: () => void;
  addLinesCleared: (lines: number) => void;
}

export const buildBoard = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );
};

export const nextBoard = ({
  addLinesCleared,
  board,
  player,
  resetPlayer,
}: NextBoardProps) => {
  const { position, tetromino } = player;
};
