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

interface ICheckValid {
  board: IBoard;
  position: { row: number; column: number };
  shape: number[][];
}

// shape 가장자리로 부터 1 떨어져있는 position이 전체 board안에 속하는지 판단
export const isWithinBoard = ({ board, position, shape }: ICheckValid) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) {
          return false;
        }
      }
    }
  }
  return true;
};

// shape 가장자리로 부터 1 떨어져있는 position이 전체 board안에 속하는지
// 만약 속한다면 1로 부터 떨어져있는 곳에 블록이 이미 자리 잡았는지 판단
export const hasCollistionWithOtherPiece = ({
  board,
  position,
  shape,
}: ICheckValid) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] && board.rows[row]) {
        const column = x + position.column;

        const isOccupied =
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied;

        if (isOccupied) {
          return true;
        }
      }
    }
  }

  return false;
};

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

  console.log("player.collided", player.collided);

  if (player.collided) {
    resetPlayer();
  }
  // if()

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
