import { Route, Routes } from "react-router-dom";
import { getGamescreens } from "./componentInstantiations";
import SelectionScreen from "./components/SelectionScreen";
import { getMapPreviews } from "./componentInstantiations";
import css from "./style.css";

function App() {
  const {
    maze: mazeGamescreen,
    beach: beachGamescreen,
    snow: snowGamescreen,
  } = getGamescreens();

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
