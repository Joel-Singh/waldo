import { useEffect, useState } from "react";
import getPageXandGetPageY from "../util/getPageXandGetPageY";

export default function CursorOverlay() {
  const [pos, setPos] = useState({x: 0, y: 0})

  useEffect(() => {
    const body = document.querySelector('body')
    body.addEventListener('mousemove', updatePos)

    return () => {
      body.removeEventListener('mousemove', updatePos)
    }
  }, [])
  return (
    <div
      style={{
        "--x": pos.x,
        "--y": pos.y,
      }}
    ></div>
  );

  function updatePos(e) {
    const { pageX, pageY } = getPageXandGetPageY(e)
    setPos({x: pageX, y: pageY})
  }
}
