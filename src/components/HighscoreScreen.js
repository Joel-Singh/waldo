import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getFirebaseFunctions from "../util/firebase";

/*
TODO:
- Show the option to add the players score if over the last top ten
- Don't show the option to add the players score

*/
export default function HighscoreScreen({ map, currentPlayerScore = 99 }) {
  const [topTenHighscores, setTopTenHighscores] = useState([]);

  useEffect(() => {
    setTopTenHighscores([]);
    const { getTopTenHighscores } = getFirebaseFunctions();

    let ignore = false;

    getTopTenHighscores(map).then((topTenHighscores) => {
      if (!ignore) setTopTenHighscores(topTenHighscores);
    });

    return () => {
      ignore = true;
    };
  }, [map]);

  return (
    <div data-testid="HighscoreScreen">
      {topTenHighscores.map(({ initials, timeTaken }) => (
        <div key={initials}>
          <span>{initials}</span>
          <span>{timeTaken}</span>
        </div>
      ))}
      <div>Your score is: {currentPlayerScore.toFixed(1)}</div>
    </div>
  );
}

HighscoreScreen.propTypes = {
  map: PropTypes.string.isRequired,
};
