import { render, screen } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters.js";
import {
  addFakeCharacterCoordsToDatabase,
  clearDatabase,
} from "../util/firebase.js";
import SelectionScreen from "../components/SelectionScreen.js";
import runTestsWithAllMaps from "../util/runTestsWithAllMaps.js";

jest.mock("../components/HighscoreScreen.js", () => () => {
  return <div data-testid="HighscoreScreen"></div>;
});

jest.mock("../components/Stopwatch.js", () => () => {
  return <div></div>;
});

jest.mock("../components/SelectionScreen.js", () => jest.fn(() => null));

beforeAll(async () => {
  await clearDatabase();
  await addFakeCharacterCoordsToDatabase();
});

runTestsWithAllMaps((mapName) => {
  it("initially Gamescreen is shown and HighscoreScreen is hidden", () => {
    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("Gamescreen")).toBeDefined();
    expect(screen.queryByTestId("HighscoreScreen")).toBeNull();
  });

  test("Shows highscore screen and hides gamescreen when all characters are chosen", async () => {
    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>
    );

    await chooseAllCharactersIn(mapName);

    expect(screen.queryByTestId("Gamescreen")).toBeNull();
    expect(screen.getByTestId("HighscoreScreen")).toBeDefined();
  });
});

test("Selection screen is passed map previews", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const latestCallInformation = SelectionScreen.mock.calls.slice(-1);
  expect(latestCallInformation).toMatchSnapshot();
});
