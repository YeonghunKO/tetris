import { IBoard } from "@/business/Board";
import { Action, actionForKey } from "@/business/Input";
import { playerController } from "@/business/PlayerController";
import Arrows from "@/components/common/icons/Arrows";
import { IStats } from "@/hooks/useGameStats";
import { useInterval } from "@/hooks/useInterval";
import { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { useEffect } from "react";

import "./ArrowKeys.css";
import { useDropTime } from "@/hooks/useDropTime";

interface ControllerProps {
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameStats: IStats;
  player: IBuildPlayerReturn;
  setPlayer: React.Dispatch<React.SetStateAction<IBuildPlayerReturn>>;
  board: IBoard;
}

const Controller = ({
  gameStats,
  setGameOver,
  board,
  player,
  setPlayer,
}: ControllerProps) => {
  const handleInput = ({ action }: { action: string }) => {
    // 현재 플레이어에 대한 정보를 action에 따라서 갱신함
    // player가 바뀌면 (shape,position,colldied,isFastDroping) Tetris.tsx에서 board도 바뀜
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

  const [dropTime] = useDropTime({ gameStats });

  useInterval({
    callback: () => handleInput({ action: Action.SlowDrop }),
    delay: dropTime,
  });

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      const action = actionForKey(evt.code as any);

      if (action === Action.Pause) {
      } else if (action === Action.Quit) {
        setGameOver(true);
      } else {
        handleInput({ action });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleInput]);

  const handleArrowUp = () => {
    handleInput({ action: Action.Rotate });
  };

  const handleArrowDown = () => {
    handleInput({ action: Action.SlowDrop });
  };

  const handleArrowRight = () => {
    handleInput({ action: Action.Right });
  };

  const handleArrowLeft = () => {
    handleInput({ action: Action.Left });
  };

  const handleSpaceBar = () => {
    handleInput({ action: Action.FastDrop });
  };

  return (
    <>
      <button className="space-bar" onClick={handleSpaceBar}>
        space bar
      </button>
      <div className="Arrows">
        <Arrows onClick={handleArrowUp} direction="up" />
        <Arrows onClick={handleArrowDown} direction="down" />
        <Arrows onClick={handleArrowRight} direction="right" />
        <Arrows onClick={handleArrowLeft} direction="left" />
      </div>
    </>
  );
};

export default Controller;
