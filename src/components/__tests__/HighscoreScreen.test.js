import { act, getByTestId, render, screen, waitFor } from "@testing-library/react";
import getFirebaseFunctions from "../../util/firebase";
import { BrowserRouter } from "react-router-dom"
import HighscoreScreen from "../HighscoreScreen";

async function renderHighscoreScreen(highscoreScreen) {
  render(
    <BrowserRouter>
      {highscoreScreen}
    </BrowserRouter>
  );

  // need to wait for the initial fetch of the scores
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 50))
  })

  return screen.getByTestId("HighscoreScreen")
}

test("Highscore screen renders", async () => {
  const highscoreScreen = await renderHighscoreScreen(<HighscoreScreen map="maze" />);
  expect(highscoreScreen).toBeDefined();
});

test("Highscore screen renders highscores", async () => {
  const { addHighscore, clearHighscores } = getFirebaseFunctions();

  const createHighscoreEntry = (initials, timeTaken) => ({ initials, timeTaken });
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
    initialsAndScores.map(({ initials, timeTaken }) =>
      addHighscore("maze", initials, timeTaken)
    )
  );

  const highscoreScreen = await renderHighscoreScreen(<HighscoreScreen map="maze" />);

  expect(highscoreScreen).toMatchSnapshot()
});

test("Highscore screen renders current score", async () => {
  await renderHighscoreScreen(<HighscoreScreen map="maze" currentPlayerScore={11.0} />)
  expect(screen.getByText('11.0', {exact: false})).toBeDefined()
})

it("doesn't offer the option to upload score when score isn't in top ten", async () => {
  const { addHighscore, clearHighscores } = getFirebaseFunctions();
  const createHighscoreEntry = (initials, timeTaken) => ({ initials, timeTaken });

  await clearHighscores()
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

  await Promise.all(
    initialsAndScores.map(({ initials, timeTaken }) =>
      addHighscore("maze", initials, timeTaken)
    )
  );

  await renderHighscoreScreen(<HighscoreScreen map="maze" currentPlayerScore={11.0} />);
  expect(screen.queryByRole('textbox')).toBeNull()
})

it("does offer the option to upload score when score is in top ten", async () => {
  const { addHighscore, clearHighscores } = getFirebaseFunctions();
  const createHighscoreEntry = (initials, timeTaken) => ({ initials, timeTaken });

  await clearHighscores()
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

  await Promise.all(
    initialsAndScores.map(({ initials, timeTaken }) =>
      addHighscore("maze", initials, timeTaken)
    )
  );

  await renderHighscoreScreen(<HighscoreScreen map="maze" currentPlayerScore={0.5} />);
  expect(screen.queryByRole('textbox')).not.toBeNull()
})
