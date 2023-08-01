import "./BoardCell.css";

export const BoardCell = ({ cell }: { cell: { className: string } }) => {
  return (
    <div className={`BoardCell ${cell.className}`}>
      <div className="Sparkle"></div>
    </div>
  );
};
