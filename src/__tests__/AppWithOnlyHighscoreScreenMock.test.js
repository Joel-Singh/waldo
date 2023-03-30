import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters";
import {
  addFakeCharacterCoordsToDatabase,
  clearDatabase,
} from "../util/firebase";
import wait from "../util/Wait";
import runTestsWithAllMaps from "../util/runTestsWithAllMaps.js";

let latestProps = {};
jest.mock("../components/HighscoreScreen.js", () => (props) => {
  latestProps = props;
  return <div data-testid="HighscoreScreen"></div>;
});

runTestsWithAllMaps((mapName) => {
  test("App passes in props to HighscoreScreen", async () => {
    await clearDatabase();
    await addFakeCharacterCoordsToDatabase();

    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>
    );

    await chooseAllCharactersIn(mapName);

    const secondsElapsed = 0.3;
    await act(async () => {
      await wait(secondsElapsed * 1000);
    });

    expect(latestProps.map).toBe(mapName);
    expect(latestProps.currentPlayerScore).toBeGreaterThan(secondsElapsed);
  });
});
