import { IBuildPlayerReturn } from "@/hooks/usePlayer";
import { IBoard, hasCollistionWithOtherPiece, isWithinBoard } from "./Board";
import { Action } from "./Input";
import { rotate } from "./Tetrominoes";

export interface IPlayerController {
  action: string;
  player: IBuildPlayerReturn;
  setPlayer: React.Dispatch<React.SetStateAction<IBuildPlayerReturn>>;
  board: IBoard;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

type IAttemptRotation = Omit<IPlayerController, "action" | "setGameOver">;

type IMovePlayer = {
  direction: { row: number; column: number };
  board: IBoard;
  position: { row: number; column: number };
  shape: number[][];
};

export const movePlayer = ({
  board,
  direction,
  position,
  shape,
}: IMovePlayer) => {
  const desiredPosition = {
    row: position.row + direction.row,
    column: position.column + direction.column,
  };

  const collided = hasCollistionWithOtherPiece({
    board,
    position: desiredPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredPosition,
    shape,
  });

  const isValidPosition = !collided && isOnBoard;
  const nextPlayerPosition = isValidPosition ? desiredPosition : position;

  const isMovingDown = direction.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return {
    collided: isHit,
    nextPlayerPosition,
    isOnBoard,
  };
};

const attemptRotation = ({ board, player, setPlayer }: IAttemptRotation) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollistionWithOtherPiece({
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
  // direction는 쌓이지 않는다. 1 , 0 , -1 일 뿐.
  // 그저 방향만 알려주고 있는 것
  const direction = { row: 0, column: 0 };

  let isFastDropping = false;

  if (action === Action.Left) {
    direction.column -= 1;
  } else if (action === Action.Right) {
    direction.column += 1;
  } else if (action === Action.SlowDrop) {
    direction.row += 1;
  } else if (action === Action.FastDrop) {
    isFastDropping = true;
  }

  // 현재위치에서 direction만큼 움직일 수 있는지 판단. 가능하면 nextPlayerPosition을 리턴함

  const { collided, nextPlayerPosition } = movePlayer({
    direction: direction,
    board,
    position: player.position,
    shape: player.tetromino.shape,
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(true);
  }

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

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setGameOver, setPlayer, action });
  }
};
