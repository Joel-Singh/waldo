import { Route, Routes } from "react-router-dom";
import Gamescreen from "./components/Gamescreen";
import SelectionScreen from "./components/SelectionScreen";
import getMapPreviews from "./getMapPreviews.js";

function App() {
  const mazeGamescreen = <Gamescreen />;
  const beachGamescreen = <Gamescreen />;
  const snowGamescreen = <Gamescreen />;

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
