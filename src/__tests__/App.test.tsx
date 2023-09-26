import { render, screen } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "../App";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters.js";
import {
  addFakeCharacterCoordsToDatabase,
  clearDatabase,
} from "../util/firebase.js";
import SelectionScreen from "../components/SelectionScreen.js";
import runTestsWithAllMaps from "../util/runTestsWithAllMaps.js";

jest.mock("../components/Stopwatch.js", () => () => {
  return <div></div>;
});

jest.mock("../components/SelectionScreen.js", () => jest.fn(() => null));

beforeAll(async () => {
  await clearDatabase();
  await addFakeCharacterCoordsToDatabase();
});

runTestsWithAllMaps((mapName) => {
  it("initially Gamescreen is shown and FinalScoreScreen is hidden", () => {
    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("Gamescreen")).toBeDefined();
    expect(screen.queryByTestId("FinalScoreScreen")).toBeNull();
  });

  test("Shows FinalScoreScreen and hides gamescreen when all characters are chosen", async () => {
    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>
    );

    await chooseAllCharactersIn(mapName);

    expect(screen.queryByTestId("Gamescreen")).toBeNull();
    expect(screen.getByTestId("FinalScoreScreen")).toBeDefined();
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

test("App renders message with nonvalid path", () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/invalidPath"]}>
      <App />
    </MemoryRouter>
  );

  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="App"
  >
    <div>
      Not a valid path
    </div>
  </div>
</div>
`)
});
