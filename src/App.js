import { Route, Routes } from "react-router-dom";
import Gamescreen from "./components/Gamescreen";
import SelectionScreen from "./components/SelectionScreen";

const mazeGamescreen = <Gamescreen />;
const beachGamescreen = <Gamescreen />;
const snowGamescreen = <Gamescreen />;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={null}/>
        {/* Add map previews to this selection screen */}
        <Route path="/" element={<SelectionScreen />}/>
      </ Routes>
      <Routes>
        <Route path="/maze" element={mazeGamescreen}/>
        <Route path="/beach" element={beachGamescreen}/>
        <Route path="/snow" element={snowGamescreen}/>
      </ Routes>
    </div>
  );
}

export default App;
