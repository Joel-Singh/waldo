import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTopTenHighscores, addHighscore } from "../util/firebase";

// eslint-disable-next-line
import highscoreScreenCss from "../styles/highscoreScreen.css";

export default function HighscoreScreen({
  map,
  currentPlayerScore = 99,
  backToSelectionScreenBtnOnClick = () => {},
}) {
  const { topTenHighscores, updateTopTenHighscores } =
    useTopTenHighscoresFromDatabase();
  const [scoreInputIsHidden, setScoreInputIsHidden] = useState(false);

  return (
    <div data-testid="HighscoreScreen" className="highscoreScreen">
      <ol
        data-testid="HighscoreScreen__scores-container"
        className="highscoreScreen__scores-container"
      >
        {topTenHighscores.map(({ initials, timeTaken }, index) => (
          <li key={index} data-position={index + 1}>
            <span>{initials}</span>
            <span>{timeTaken.toFixed(1)}</span>
          </li>
        ))}
      </ol>
      <div className="HighscoreScreen__player-score">
        Your score is: {currentPlayerScore.toFixed(1)} seconds
      </div>

      <ScoreInput />

      <Link
        to={"/"}
        className="highscoreScreen__back-btn"
      >
        <button
          onClick={backToSelectionScreenBtnOnClick}
          type="button"
        >
          Go back to selection screen
        </button>
      </Link>
    </div>
  );

  function ScoreInput() {
    const onUploadScoreClick = async () => {
      const initials = document.getElementById("initials").value;
      if (initials !== "") {
        setScoreInputIsHidden(true);
        await addHighscore(map, initials, currentPlayerScore);
        updateTopTenHighscores();
      }
    };

    return isCurrentPlayerScoreInTopTen() && !scoreInputIsHidden ? (
      <div className="highscoreScreen__score-input">
        <label htmlFor="initials">Enter Initials to upload score</label>
        <input id="initials" type="text" />
        <button
          type="button"
          onClick={onUploadScoreClick}
          className="highscoreScreen__score-input__upload-score-btn"
        >
          Upload score
        </button>
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
    const [updateTopTenHighscoresState, setUpdateTopTenHighscoresState] =
      useState(0);

    useEffect(() => {
      setTopTenHighscores([]);
      let ignore = false;

      getTopTenHighscores(map).then((topTenHighscores) => {
        if (!ignore) setTopTenHighscores(topTenHighscores);
      });

      return () => {
        ignore = true;
      };
    }, [updateTopTenHighscoresState]);

    const updateTopTenHighscores = () =>
      setUpdateTopTenHighscoresState((prev) => prev + 1);
    return { topTenHighscores, updateTopTenHighscores };
  }
}

HighscoreScreen.propTypes = {
  map: PropTypes.string.isRequired,
};
