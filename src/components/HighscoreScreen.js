import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTopTenHighscores, addHighscore } from "../util/firebase";

export default function HighscoreScreen({
  map,
  currentPlayerScore = 99,
  backToSelectionScreenBtnOnClick = () => {},
}) {
  const { topTenHighscores, updateTopTenHighscores } =
    useTopTenHighscoresFromDatabase();

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

      {<ScoreInput />}

      <Link to={"/"}>
        <button onClick={backToSelectionScreenBtnOnClick} type="button">
          Go Back to selection screen
        </button>
      </Link>
    </div>
  );

  function ScoreInput() {
    const [isHidden, setIsHidden] = useState(false);

    const onUploadScoreClick = async () => {
      const initials = document.getElementById("initials").value;
      if (initials !== "") {
        setIsHidden(true);
        await addHighscore(map, initials, currentPlayerScore);
        updateTopTenHighscores();
      }
    };

    return isCurrentPlayerScoreInTopTen() && !isHidden ? (
      <div>
        <label htmlFor="initials">Enter Initials to upload score</label>
        <input id="initials" type="text" />
        <button type="button" onClick={onUploadScoreClick}>
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
