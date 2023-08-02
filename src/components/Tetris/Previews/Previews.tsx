import type { BuildPlayerProp } from "@/hooks/usePlayer";
import { Preview } from "./Preview";

import "./Preview.css";

interface IPreviews {
  tetrominoes: BuildPlayerProp[];
}

const Previews = ({ tetrominoes }: IPreviews) => {
  const previewTetrominoes = tetrominoes.slice(1 - tetrominoes.length);

  console.log("previewTetrominoes", previewTetrominoes);

  return (
    <div className="Previews">
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} key={index} index={index} />
      ))}
    </div>
  );
};

export default Previews;
