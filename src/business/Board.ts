import type { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { DefaultCell, defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";

export type IBoard = {
  rows: DefaultCell[][];
  size: {
    rows: number;
    columns: number;
  };
};

interface NextBoardProps {
  board: IBoard;
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

  return {
    rows: builtRows,
    size: { rows, columns },
  };
};

// 다음에 그려질 board를 매번 업데이트하는 함수
export const nextBoard = ({
  addLinesCleared,
  board,
  player,
  resetPlayer,
}: NextBoardProps) => {
  const { position, tetromino } = player;
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });

  return {
    rows,
    size: { ...board.size },
  };
};
