import { IBoard } from "@/business/Board";
import { Action, actionForKey } from "@/business/Input";
import { playerController } from "@/business/PlayerController";
import { IStats } from "@/hooks/useGameStats";
import { useInterval } from "@/hooks/useInterval";
import { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { useEffect } from "react";

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

  useInterval({
    callback: () => handleInput({ action: Action.SlowDrop }),
  });

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      const action = actionForKey(evt.code as any);

      if (action === Action.Pause) {
        console.log("pause");
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
  return <></>;
};

export default Controller;
