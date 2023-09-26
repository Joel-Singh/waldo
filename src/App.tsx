import { Route, Routes } from "react-router-dom";
import SelectionScreen from "./components/SelectionScreen";
import { getGamescreens, getMapPreviews } from "./util/componentInstantiations";
import FinalScoreScreen from "./components/FinalScoreScreen";

import "./styles/all.css";
import { useState } from "react";
import { allMaps } from "./util/constants";

function App() {
  const [showFinalScoreScreen, setShowFinalScoreScreen] = useState(false);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<div>Not a valid path</ div>} />
        <Route
          path="/"
          element={
            <SelectionScreen
              mapPreviews={allMaps.map((map) => getMapPreviews()[map])}
            />
          }
        />
        {allMaps.map((map) => createRouteForMap(map))}
      </Routes>
    </div>
  );

  function createRouteForMap(map) {
    const gamescreen = getGamescreens((timeElapsed) => {
      setShowFinalScoreScreen(true);
      setCurrentPlayerScore(timeElapsed);
    })[map];

    return (
      <Route
        path={`/${map}`}
        key={map}
        element={
          !showFinalScoreScreen ? (
            gamescreen
          ) : (
            <FinalScoreScreen
              finalScore={currentPlayerScore}
              backToSelectionScreenBtnOnClick={() =>
                setShowFinalScoreScreen(false)
              }
            />
          )
        }
      />
    );
  }
}

export default App;
