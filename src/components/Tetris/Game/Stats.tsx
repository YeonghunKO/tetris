import type { IStats } from "@/hooks/useGameStats";
import "./stats.css";

const Stats = ({ gameStats }: { gameStats: IStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;
  return (
    <ul className="GameStats">
      <li>레벨: {level}</li>
      <li>다음레벨까지: {linesToLevel}</li>
      <li>점수: {points}</li>
    </ul>
  );
};

export default Stats;
