import { Route, Routes } from "react-router-dom";
import SelectionScreen from "./components/SelectionScreen";
import { getGamescreens, getMapPreviews } from "./util/componentInstantiations";
import HighscoreScreen from "./components/HighscoreScreen";

// eslint-disable-next-line
import all from "./styles/all.css";
import { useState } from "react";

function App() {
  const [showHighscoreScreen, setShowHighscoreScreen] = useState(false);

  const {
    maze: mazeGamescreen,
    beach: beachGamescreen,
    snow: snowGamescreen,
  } = getGamescreens(() => {
    setShowHighscoreScreen(true);
  });

  const { mazeMapPreview, beachMapPreview, snowMapPreview } = getMapPreviews();
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={null} />
        <Route
          path="/"
          element={
            <SelectionScreen
              mapPreviews={[mazeMapPreview, beachMapPreview, snowMapPreview]}
            />
          }
        />
        <Route
          path="/maze"
          element={
            !showHighscoreScreen ? (
              mazeGamescreen
            ) : (
              <HighscoreScreen map="maze" />
            )
          }
        />
        <Route
          path="/beach"
          element={
            !showHighscoreScreen ? (
              beachGamescreen
            ) : (
              <HighscoreScreen map="beach" />
            )
          }
        />

        <Route path="/snow"
          element={
            !showHighscoreScreen ? (
              snowGamescreen
            ) : (
              <HighscoreScreen map="snow" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
