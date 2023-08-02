import { buildBoard } from "@/business/Board";
import { transferToBoard } from "@/business/Tetrominoes";
import { BuildPlayerProp } from "@/hooks/usePlayer";
import { BoardCell } from "../Board/BoardCell";

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
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  console.log("board", board);

  return (
    <div className="Preview">
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};
