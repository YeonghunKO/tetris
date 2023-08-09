import type { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { DefaultCell, defaultCell } from "./Cell";
import { transferToBoard } from "./Tetrominoes";
import { IPlayerController, movePlayer } from "./PlayerController";

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

type IFastDrop = Omit<
  IPlayerController,
  "action" | "setGameOver" | "setPlayer"
>;

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
      if (shape[y][x]) {
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

const findDropPosition = ({ board, player }: IFastDrop) => {
  const {
    position,
    tetromino: { shape },
  } = player;
  const maxDroppableRowPos = board.size.rows - player.position.row;

  let directionRow = 0;
  for (let y = 0; y < maxDroppableRowPos; y++) {
    const result = movePlayer({
      board,
      direction: { row: y, column: 0 },
      position,
      shape,
    });

    if (result.collided) {
      break;
    }

    directionRow++;
  }

  const dropPosition = {
    row: player.position.row + directionRow - 1,
    column: player.position.column,
  };

  return dropPosition;
};

const checkOccupiedLines = (rows: any[][]) => {
  const defaultLine = Array.from({ length: rows[0].length }, () => ({
    ...defaultCell,
  }));

  let clearedLines = 0;
  const clearedRows = rows.reduce((acc, row) => {
    const isCellInLineOccupied = row.every((cell) => cell.occupied);

    if (isCellInLineOccupied) {
      acc.unshift(defaultLine);
      clearedLines++;
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  return {
    clearedRows,
    clearedLines,
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

  const dropPos = findDropPosition({ board, player });

  const className = `${
    player.isFastDropping
      ? player.tetromino.className
      : `${player.tetromino.className} ghost`
  }`;

  // rows를 새롭게 갱신함 --> ghost와 drop되었을때 블럭을 board에 갱신
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping, // 왜 player.isOccupied 이어야 되는지 알아보기
    position: dropPos,
    rows,
    shape: tetromino.shape,
  });

  // 맨위에 새롭게 추가되는 블럭을 갱신
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided,
      position,
      rows,
      shape: tetromino.shape,
    });
  }

  const { clearedRows, clearedLines } = checkOccupiedLines(rows);
  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows: clearedRows,
    shape: tetromino.shape,
  });

  addLinesCleared(clearedLines);

  if (player.collided || player.isFastDropping) {
    // 매번 움직일때 마다. 클리어해야할 line이 있는지 확인하기
    resetPlayer();
  }
  return {
    rows,
    size: { ...board.size },
  };
};
