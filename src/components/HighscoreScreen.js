import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getFirebaseFunctions from "../util/firebase";

export default function HighscoreScreen({ map, currentPlayerScore = 99 }) {
  const topTenHighscores = useTopTenHighscoresFromDatabase();

  return (
    <div data-testid="HighscoreScreen">
      <div data-testid="HighscoreScreen__scores-container">
        {topTenHighscores.map(({ initials, timeTaken }) => (
          <div key={initials}>
            <span>{initials}</span>
            <span>{timeTaken}</span>
          </div>
        ))}
      </div>
      <div>Your score is: {currentPlayerScore.toFixed(1)}</div>

      {renderScoreInput()}

      <Link to={"/"}>
        <button type="button">Go Back to selection screen</button>
      </Link>
    </div>
  );

  function renderScoreInput() {
    const [isHidden, setIsHidden] = useState(false);

    const onUploadScoreClick = () => {
      const initials = document.getElementById('initials').value
      if (initials !== '') {
        setIsHidden(true);
        const { addHighscore } = getFirebaseFunctions()
        addHighscore(map, initials, currentPlayerScore)
      }
    };

    return (isCurrentPlayerScoreInTopTen() && !isHidden) ? (
      <div>
        <label htmlFor="initials">Enter Initials to upload score</label>
        <input id="initials" type="text" />
        <button type="button" onClick={onUploadScoreClick}>Upload score</button>
      </div>
    ) : null;

    function isCurrentPlayerScoreInTopTen() {
      let currentPlayerScoreIsInTopTen = false;
      if (topTenHighscores[9] !== undefined)
        currentPlayerScoreIsInTopTen =
          currentPlayerScore < topTenHighscores[9].timeTaken;

      return currentPlayerScoreIsInTopTen;
    }
  }

  function useTopTenHighscoresFromDatabase() {
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

    return topTenHighscores;
  }
}

HighscoreScreen.propTypes = {
  map: PropTypes.string.isRequired,
};
