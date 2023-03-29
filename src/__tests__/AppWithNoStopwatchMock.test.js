import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import HighscoreScreen from "../components/HighscoreScreen";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters";
import getFirebaseFunctions from "../util/firebase";
import wait from "../util/Wait";

let latestProps = {}
jest.mock("../components/HighscoreScreen.js", () => (props) => {
  latestProps = props
  return <div data-testid="HighscoreScreen"></div>;
});

jest.setTimeout(30 * 1000)
test("App passes in props to HighscoreScreen", async () => {
  const { addFakeCharacterCoordsToDatabase, clearDatabase } = getFirebaseFunctions()
  await clearDatabase()
  await addFakeCharacterCoordsToDatabase()

  const map = 'maze'
  render(
    <MemoryRouter initialEntries={[`/${map}`]}>
      <App />
    </MemoryRouter>
  );

  await chooseAllCharactersIn(map);

  const secondsElapsed = 0.3;
  await act(async () => {
    await wait(secondsElapsed * 1000)
  })

  expect(latestProps.map).toBe(map);
  expect(latestProps.currentPlayerScore).toBeGreaterThan(secondsElapsed);
});

