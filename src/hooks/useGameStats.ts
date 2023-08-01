import { useCallback, useState } from "react";

const buildGameState = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameState());

  const addLinesCleared = useCallback((lines: number) => {
    setGameStats(
      (previous: {
        level: number;
        linesCompleted: number;
        linesPerLevel: number;
        points: number;
      }) => {
        const points = previous.points + lines * 100;
        const { linesPerLevel } = previous;
        const newLinesCompleted = previous.linesCompleted + lines;
        const level =
          newLinesCompleted >= linesPerLevel
            ? previous.level + 1
            : previous.level;

        const linesCompleted = newLinesCompleted % linesPerLevel;

        return {
          level,
          linesCompleted,
          linesPerLevel,
          points,
        };
      }
    );
  }, []);

  return [gameStats, addLinesCleared] as const;
};
