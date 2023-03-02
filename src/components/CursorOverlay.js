import { useState } from "react";
import getPageXandGetPageY from "../util/getPageXandGetPageY";

export default function CursorOverlay() {
  const [pos, setPos] = useState({x: 0, y: 0})
  return (
    <div
      style={{
        "--x": pos.x,
        "--y": pos.y,
      }}
      onMouseMove={
        (e) => {
          const { pageX, pageY } = getPageXandGetPageY(e)
          setPos({x: pageX, y: pageY})
        }
      }
    ></div>
  );
}
