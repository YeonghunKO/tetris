import React from "react";
import "./Mene.css";

export const Menu = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="Menu">
      <button className="Button" onClick={onClick}>
        Play Tetris
      </button>
    </div>
  );
};
