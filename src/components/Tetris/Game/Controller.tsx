import { IBoard } from "@/business/Board";
import { Action, actionForKey } from "@/business/Input";
import { playerController } from "@/business/PlayerController";
import { IStats } from "@/hooks/useGameStats";
import { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { useCallback, useEffect } from "react";

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
    console.log("action", action);

    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };

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

      //   if (action === ACTION.QUIT) {
      //     setGameOver(true);
      //   }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleInput]);
  return <></>;
};

export default Controller;
