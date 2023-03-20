import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getFirebaseFunctions from "../util/firebase";

export default function HighscoreScreen({ map }) {
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
    </div>
  );
}

HighscoreScreen.propTypes = {
  map: PropTypes.string.isRequired,
};
