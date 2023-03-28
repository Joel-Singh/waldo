import { render, screen } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { chooseAllCharactersIn } from "./util/ChoosingCharacters.js";
import getFirebaseFunctions from "./util/firebase.js";

jest.mock("./components/HighscoreScreen.js", () => () => {
  return <div data-testid="HighscoreScreen"></div>;
});

jest.mock("./components/Stopwatch.js", () => () => {
  return <div></div>;
});

beforeAll(async () => {
  const { addFakeCharacterCoordsToDatabase, clearDatabase } = getFirebaseFunctions()
  await clearDatabase()
  await addFakeCharacterCoordsToDatabase()
})

describe.each(['maze', 'beach', 'snow'])('for %s,', (mapName) => {
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
})

