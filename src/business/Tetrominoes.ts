const className = "tetromino";

interface TransferToBoardProps {
  className: string;
  isOccupied: boolean;
  position: { row: number; column: number };
  rows: { occupied: boolean; className: string }[][];
  shape: number[][];
}

export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${className} ${className}__i`,
    shapeRowLength: 4,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${className} ${className}__j`,
    shapeRowLength: 3,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${className} ${className}__l`,
    shapeRowLength: 3,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${className} ${className}__o`,
    shapeRowLength: 2,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__s`,
    shapeRowLength: 2,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${className} ${className}__t`,
    shapeRowLength: 2,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${className} ${className}__z`,
    shapeRowLength: 2,
  },
};

// 알고리즘은 역시 그림으로 그려보는것이 제일 빠르게 이해됨
// shape를 잡고 시계 방향으로 90도 돌린다고 생각.
// 그럼 세로가 가로가 되면 됨. 즉, column이 row가 되어야 함.
export const rotate = ({
  piece,
  direction,
}: {
  piece: number[][];
  direction: number;
}) => {
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  console.log("newPiece", newPiece);
  if (direction > 0) {
    return newPiece.map((row) => row.reverse());
  }

  return newPiece.reverse();
};

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index] as keyof typeof TETROMINOES;
  return TETROMINOES[key];
};

// 넘겨받은 rows(board) 에 shape(블록)를 새겨넣는 일
// shape에서 1로 표시된 부분이 {occupied , className}으로 변환됨
// 단 position = {row,column} 이 설정되어있으면 shape 에서 1의 위치가 변경됨

export const transferToBoard = ({
  className, // shape에서 1로 표되는 부분만 className이 지정됨
  isOccupied, //
  position, // shape에서 position만큼 이동시킴, 예를 들어 shape에서 0,0 지점이 1이었다면 position = {row:1,column:1} 라면 1,1지점에 1로 지정됨
  rows, // pass된 board를 뜻함.
  shape, // tetromino , 즉 블럭을 뜻함. rows(board)에 shape가 입혀짐
}: TransferToBoardProps) => {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;

        rows[_y][_x] = { occupied, className };
      }
    });
  });
  return rows;
};
