import { act, getByTestId, render, screen, waitFor } from "@testing-library/react";
import getFirebaseFunctions from "../../util/firebase";
import HighscoreScreen from "../HighscoreScreen";

async function renderHighscoreScreen(map) {
  const {container : {firstChild : highscoreScreen }} = render(<HighscoreScreen map={map} />);

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  return highscoreScreen
}

test("Highscore screen renders", async () => {
  const highscoreScreen = await renderHighscoreScreen("maze");
  expect(highscoreScreen).toBeDefined();
});

test("Highscore screen renders highscores", async () => {
  const { addHighscore, clearHighscores } = getFirebaseFunctions();

  const createHighscoreEntry = (initials, score) => ({ initials, score });
  const initialsAndScores = [
    createHighscoreEntry("AB", 1),
    createHighscoreEntry("CD", 2),
    createHighscoreEntry("EF", 3),
    createHighscoreEntry("GH", 4),
    createHighscoreEntry("IJ", 5),
    createHighscoreEntry("KL", 6),
    createHighscoreEntry("MN", 7),
    createHighscoreEntry("OP", 8),
    createHighscoreEntry("QR", 9),
    createHighscoreEntry("ST", 10),
  ];

  await clearHighscores()
  await Promise.all(
    initialsAndScores.map(({ initials, score }) =>
      addHighscore("maze", initials, score)
    )
  );

  const highscoreScreen = await renderHighscoreScreen("maze");

  expect(highscoreScreen).toMatchSnapshot()
});
