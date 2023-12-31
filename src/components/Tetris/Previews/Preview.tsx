import { buildBoard } from "@/business/Board";
import { transferToBoard } from "@/business/Tetrominoes";
import { BuildPlayerProp } from "@/hooks/usePlayer";
import { BoardCell } from "../Board/BoardCell";

interface IPreview {
  tetromino: BuildPlayerProp;
  index: number;
}

export const Preview = ({ tetromino }: IPreview) => {
  const { className, shape } = tetromino;
  const board = buildBoard({ rows: 4, columns: 4 });

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape,
  });

  return (
    <div className="Preview">
      <div className="Preview-board">
        {board.rows.map((row) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};
