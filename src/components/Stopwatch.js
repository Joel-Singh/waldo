import { useEffect } from "react";
import { decisecondToMs } from "../util/constants";

export default function Stopwatch({ secondsElapsed, incrementDecisecond }) {
  useEffect(() => {
    const intervalID = setInterval(incrementDecisecond, decisecondToMs);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return <div className="stopwatch">{secondsElapsed}</div>;
}
