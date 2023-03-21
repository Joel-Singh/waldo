import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getFirebaseFunctions from "../util/firebase";

/*
TODO:
- Show the option to add the players score if over the last top ten
- Don't show the option to add the players score

*/
export default function HighscoreScreen({ map, currentPlayerScore = 99 }) {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    setHighscores([]);
    const { getTopTenHighscores } = getFirebaseFunctions();

    let ignore = false;

    getTopTenHighscores(map).then((topTenHighscores) => {
      if (!ignore) setHighscores(topTenHighscores);
    });

    return () => {
      ignore = true;
    };
  }, [map]);

  return (
    <div data-testid="HighscoreScreen">
      {highscores.map(({ initials, timeTaken }) => (
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
