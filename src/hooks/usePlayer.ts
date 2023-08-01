import { useCallback, useState } from "react";
import { randomTetromino } from "@/business/Tetrominoes";

interface BuildPlayerProp {
  className: string;
  shape: number[][];
}

export interface IBuildPlayerReturn {
  collided: boolean;
  isFastDropping: boolean;
  position: { row: number; column: number };
  tetrominoes: BuildPlayerProp[];
  tetromino: {
    shape: number[][];
    className: string;
  };
}

type BuildPlayer = (prev?: BuildPlayerProp[]) => {
  collided: boolean;
  isFastDropping: boolean;
  position: { row: number; column: number };
  tetrominoes: BuildPlayerProp[];
  tetromino: {
    shape: number[][];
    className: string;
  };
};

const buildPlayer = (previous?: BuildPlayerProp[]) => {
  let tetrominoes;
  if (previous) {
    tetrominoes = [...previous, tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer((prev: any) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer] as const;
};
