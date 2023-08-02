import Arrows from "@/components/common/icons/Arrows";
import "./ArrowKeys.css";

const ArrowKeys = () => {
  return (
    <div className="Arrows">
      <Arrows direction="up" />
      <Arrows direction="down" />
      <Arrows direction="right" />
      <Arrows direction="left" />
    </div>
  );
};

export default ArrowKeys;
