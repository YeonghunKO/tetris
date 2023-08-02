import { buildBoard } from "@/business/Board";
import { transferToBoard } from "@/business/Tetrominoes";
import { BuildPlayerProp } from "@/hooks/usePlayer";

interface IPreview {
  tetromino: BuildPlayerProp;
  index: number;
}

export const Preview = ({ index, tetromino }: IPreview) => {
  const { className, shape } = tetromino;
  const board = buildBoard({ rows: 4, columns: 4 });

  // console.log("className", className);
  // console.log("board", board);

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 1, column: 1 },
    rows: board.rows,
    shape,
  });

  console.log("board", board);

  return <div>Preview</div>;
};
