import type { IBoard } from "@/business/Board";
import "./Board.css";
import { BoardCell } from "./BoardCell";

const Board = ({ board }: { board: IBoard }) => {
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
  };
  return (
    <div className="Board" style={boardStyles}>
      {board.rows.map((row) =>
        row.map((cell, x) => {
          return <BoardCell cell={cell} key={x * board.size.columns + x} />;
        })
      )}
    </div>
  );
};

export default Board;
