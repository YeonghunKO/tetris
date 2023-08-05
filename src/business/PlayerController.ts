import { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { IBoard, hasCollistion, isWithinBoard } from "./Board";
import { Action } from "./Input";
import { rotate } from "./Tetrominoes";

interface IPlayerController {
  action: string;
  player: IBuildPlayerReturn;
  setPlayer: React.Dispatch<React.SetStateAction<IBuildPlayerReturn>>;
  board: IBoard;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

type IAttemptRotation = Omit<IPlayerController, "action" | "setGameOver">;

type IMovePlayer = {
  delta: { row: number; column: number };
  board: IBoard;
  position: { row: number; column: number };
  shape: number[][];
};

const attemptRotation = ({ board, player, setPlayer }: IAttemptRotation) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollistion({
      board,
      position,
      shape,
    });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  } else {
    return;
  }
};
const attemptMovement = ({
  action,
  board,
  player,
  setGameOver,
  setPlayer,
}: IPlayerController) => {
  const delta = { row: 0, column: 0 };

  let isFastDropping = false;

  if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  }

  const movePlayer = ({ board, delta, position, shape }: IMovePlayer) => {
    const desiredPosition = {
      row: position.row + delta.row,
      column: position.column + delta.column,
    };

    const collided = hasCollistion({
      board,
      position: desiredPosition,
      shape,
    });

    const isOnBoard = isWithinBoard({
      board,
      position: desiredPosition,
      shape,
    });

    console.log("collided", collided);
    console.log("isOnBoard", isOnBoard);

    const isValidPosition = !collided && isOnBoard;
    const nextPlayerPosition = isValidPosition ? desiredPosition : position;

    // console.log("nextPlayerPosition", nextPlayerPosition);

    return {
      collided,
      nextPlayerPosition,
    };
  };

  const { collided, nextPlayerPosition } = movePlayer({
    delta,
    board,
    position: player.position,
    shape: player.tetromino.shape,
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(true);
  }

  console.log("player", player);

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPlayerPosition,
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}: IPlayerController) => {
  if (!action) {
    return;
  }
  console.log("player in playerController", player);

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setGameOver, setPlayer, action });
  }
};
