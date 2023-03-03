import { useEffect, useState } from "react";
import getPageXandGetPageY from "../util/getPageXandGetPageY";

export default function CursorOverlay({ isVisible = true }) {
  const [pos, setPos] = useState({x: 0, y: 0})

  useEffect(() => {
    const body = document.querySelector('body')
    body.addEventListener('mousemove', updatePos)

    return () => {
      body.removeEventListener('mousemove', updatePos)
    }
  }, [])

  const isVisibleClass = isVisible ? " cursor-overlay--visible" : ""
  return (
    <div
      style={{
        "--x": pos.x,
        "--y": pos.y,
      }}
      className={"cursor-overlay" + isVisibleClass}
      data-testid="cursor-overlay"
    ></div>
  );

  function updatePos(e) {
    const { pageX, pageY } = getPageXandGetPageY(e)
    setPos({x: pageX, y: pageY})
  }
}
