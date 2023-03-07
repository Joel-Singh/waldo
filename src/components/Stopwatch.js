import { useEffect } from "react";
import { decisecondToMs } from "../util/constants";
import PropTypes from "prop-types"

export default function Stopwatch({ secondsElapsed, incrementDecisecond }) {
  useEffect(() => {
    const intervalID = setInterval(incrementDecisecond, decisecondToMs);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  return <div className="stopwatch">{secondsElapsed}</div>;
}

Stopwatch.propTypes = {
  secondsElapsed: PropTypes.number.isRequired,
  incrementDecisecond: PropTypes.func.isRequired
};
