import { Route, Routes } from "react-router-dom";
import SelectionScreen from "./components/SelectionScreen";
import { getGamescreens, getMapPreviews } from "./util/componentInstantiations";
import HighscoreScreen from "./components/HighscoreScreen";

// eslint-disable-next-line
import all from "./styles/all.css";
import { useState } from "react";
import { allMaps } from "./util/constants";

function App() {
  const [showHighscoreScreen, setShowHighscoreScreen] = useState(false);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={null} />
        <Route
          path="/"
          element={
            <SelectionScreen
              mapPreviews={allMaps.map(map => getMapPreviews()[map])}
            />
          }
        />
        {allMaps.map(map => createRouteForMap(map))}
      </Routes>
    </div>
  );


  function createRouteForMap(map) {
    const gamescreen = getGamescreens((timeElapsed) => {
      setShowHighscoreScreen(true);
      setCurrentPlayerScore(timeElapsed);
    })[map]

    return (
      <Route
        path={`/${map}`}
        key={map}
        element={
          !showHighscoreScreen ? (
            gamescreen
          ) : (
            <HighscoreScreen
              map={map}
              currentPlayerScore={currentPlayerScore}
            />
          )
        }
    />)
  }
}

export default App;
