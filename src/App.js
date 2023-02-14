import { Route, Routes } from "react-router-dom";
import Gamescreen from "./components/Gamescreen";
import SelectionScreen from "./components/SelectionScreen";
import getMapPreviews from "./getMapPreviews.js";
import css from "./style.css";

import mazeMap from "./assets/maps/maze.jpg";
import beachMap from "./assets/maps/beach.jpg";
import snowMap from "./assets/maps/snow.jpg";

function App() {
  const mazeGamescreen = <Gamescreen img={mazeMap} />;
  const beachGamescreen = <Gamescreen img={beachMap} />;
  const snowGamescreen = <Gamescreen img={snowMap} />;

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
        <Route path="/maze" element={mazeGamescreen} />
        <Route path="/beach" element={beachGamescreen} />
        <Route path="/snow" element={snowGamescreen} />
      </Routes>
    </div>
  );
}

export default App;
