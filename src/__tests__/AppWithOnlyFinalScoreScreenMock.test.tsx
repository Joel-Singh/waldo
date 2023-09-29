import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App.tsx";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters";
import wait from "../util/Wait";
import runTestsWithAllMaps from "../util/runTestsWithAllMaps.js";
import { FinalScoreScreenProps } from "../components/FinalScoreScreen";

let latestProps: FinalScoreScreenProps = null;
jest.mock(
  "../components/FinalScoreScreen",
  () => (props: FinalScoreScreenProps) => {
    latestProps = props;
    return <div data-testid="FinalScoreScreen"></div>;
  },
);

runTestsWithAllMaps((mapName) => {
  test("App passes in props to FinalScoreScreen", async () => {
    render(
      <MemoryRouter initialEntries={[`/${mapName}`]}>
        <App />
      </MemoryRouter>,
    );

    await chooseAllCharactersIn(mapName);

    const secondsElapsed = 0.3;
    await act(async () => {
      await wait(secondsElapsed * 1000);
    });

    expect(latestProps.finalScore).toBeGreaterThan(secondsElapsed);
  });
});
