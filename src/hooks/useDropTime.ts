import { useEffect, useState } from "react";
import type { IStats } from "./useGameStats";

const defaultDropTime = 1150;
const speedIncreamental = 250;
const minimumSpeed = 100;

export const useDropTime = ({ gameStats }: { gameStats: IStats }) => {
  const [dropTime, setDropTime] = useState(defaultDropTime);

  useEffect(() => {
    const addToSpeed = speedIncreamental * gameStats.level;
    const nextSpeed = defaultDropTime - addToSpeed;
    const increasedSpeed = Math.max(nextSpeed, minimumSpeed);

    setDropTime(increasedSpeed);
  }, [gameStats, setDropTime]);

  return [dropTime];
};
