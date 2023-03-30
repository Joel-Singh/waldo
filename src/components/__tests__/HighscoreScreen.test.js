import { act, render, screen } from "@testing-library/react";
import {
  addHighscore,
  clearHighscores,
  getTopTenHighscores,
} from "../../util/firebase";
import { BrowserRouter } from "react-router-dom";
import HighscoreScreen from "../HighscoreScreen";
import userEvent from "@testing-library/user-event";
import wait from "../../util/Wait";

async function renderHighscoreScreen(highscoreScreen) {
  render(<BrowserRouter>{highscoreScreen}</BrowserRouter>);

  // need to wait for the initial fetch of the scores
  await act(async () => {
    await wait(50);
  });

  return screen.getByTestId("HighscoreScreen");
}

async function clearAndInitializeMazeDatabase(initialsAndScores) {
  initialsAndScores = initialsAndScores.map((array) => ({
    initials: array[0],
    timeTaken: array[1],
  }));

  await clearHighscores();
  await Promise.all(
    initialsAndScores.map(({ initials, timeTaken }) =>
      addHighscore("maze", initials, timeTaken)
    )
  );
}

async function clickUploadScoreAndWaitForUpload() {
  await act(async () => {
    userEvent.click(screen.getByText("Upload score"));

    const flushDatabaseRequests = () =>
      new Promise((resolve) => setTimeout(resolve, 200));
    await flushDatabaseRequests();
  });
}

test("Highscore screen renders highscores", async () => {
  await clearAndInitializeMazeDatabase([
    ["AB", 1],
    ["CD", 2],
    ["EF", 3],
    ["GH", 4],
    ["IJ", 5],
    ["KL", 6],
    ["MN", 7],
    ["OP", 8],
    ["QR", 9],
    ["ST", 10],
  ]);

  const highscoreScreen = await renderHighscoreScreen(
    <HighscoreScreen map="maze" />
  );

  expect(highscoreScreen).toMatchSnapshot();
});

test("Highscore screen renders current score", async () => {
  await renderHighscoreScreen(
    <HighscoreScreen map="maze" currentPlayerScore={11.0} />
  );
  expect(screen.getByText("11.0", { exact: false })).toBeDefined();
});

it("doesn't offer the option to upload score when score isn't in top ten", async () => {
  await clearAndInitializeMazeDatabase([
    ["AB", 1],
    ["CD", 2],
    ["EF", 3],
    ["GH", 4],
    ["IJ", 5],
    ["KL", 6],
    ["MN", 7],
    ["OP", 8],
    ["QR", 9],
    ["ST", 10],
  ]);

  await renderHighscoreScreen(
    <HighscoreScreen map="maze" currentPlayerScore={11.0} />
  );
  expect(screen.queryByRole("textbox")).toBeNull();
});

it("does offer the option to upload score when score is in top ten", async () => {
  await clearAndInitializeMazeDatabase([
    ["AB", 1],
    ["CD", 2],
    ["EF", 3],
    ["GH", 4],
    ["IJ", 5],
    ["KL", 6],
    ["MN", 7],
    ["OP", 8],
    ["QR", 9],
    ["ST", 10],
  ]);

  await renderHighscoreScreen(
    <HighscoreScreen map="maze" currentPlayerScore={0.5} />
  );
  expect(screen.queryByRole("textbox")).not.toBeNull();
});

describe("hiding score input", () => {
  beforeEach(async () => {
    await clearAndInitializeMazeDatabase([
      ["AB", 1],
      ["CD", 2],
      ["EF", 3],
      ["GH", 4],
      ["IJ", 5],
      ["KL", 6],
      ["MN", 7],
      ["OP", 8],
      ["QR", 9],
      ["ST", 10],
    ]);

    await renderHighscoreScreen(
      <HighscoreScreen map="maze" currentPlayerScore={0.5} />
    );
  });

  it("doesn't hide score input after clicking upload score if nothing is in initials", async () => {
    userEvent.click(screen.getByText("Upload score"));
    expect(screen.queryByRole("textbox")).not.toBeNull();
  });

  it("does hide score input after clicking upload score if there is something in initials", async () => {
    userEvent.type(screen.getByRole("textbox"), "JS");
    userEvent.click(screen.getByText("Upload score"));
    expect(screen.queryByRole("textbox")).toBeNull();
  });
});

test("Score is added to database after uploading", async () => {
  await clearAndInitializeMazeDatabase([
    ["AB", 1],
    ["CD", 2],
    ["EF", 3],
    ["GH", 4],
    ["IJ", 5],
    ["KL", 6],
    ["MN", 7],
    ["OP", 8],
    ["QR", 9],
    ["ST", 10],
  ]);

  await renderHighscoreScreen(
    <HighscoreScreen map="maze" currentPlayerScore={0.5} />
  );

  const initialsTextBox = screen.getByRole("textbox");
  userEvent.type(initialsTextBox, "JS");

  await clickUploadScoreAndWaitForUpload();

  const topTenHighscores = await getTopTenHighscores("maze");

  expect(topTenHighscores[0]).toMatchInlineSnapshot(`
Object {
  "initials": "JS",
  "timeTaken": 0.5,
}
`);
});

test("Scores are refreshed visually after current player's score is added to database", async () => {
  await clearAndInitializeMazeDatabase([
    ["AB", 1],
    ["CD", 2],
    ["EF", 3],
    ["GH", 4],
    ["IJ", 5],
    ["KL", 6],
    ["MN", 7],
    ["OP", 8],
    ["QR", 9],
    ["ST", 10],
  ]);

  await renderHighscoreScreen(
    <HighscoreScreen map="maze" currentPlayerScore={0.5} />
  );

  const initialsTextBox = screen.getByRole("textbox");
  userEvent.type(initialsTextBox, "JS");

  await clickUploadScoreAndWaitForUpload();

  await new Promise((resolve) => {
    setTimeout(() => {
      expect(
        screen.getByTestId("HighscoreScreen__scores-container")
          .firstElementChild
      ).toMatchInlineSnapshot(`
    <div>
      <span>
        JS
      </span>
      <span>
        0.5
      </span>
    </div>
    `);

      resolve();
    }, 500);
  });
});

test("Go back to selection screen callback is called", () => {
  const callback = jest.fn()
  renderHighscoreScreen(<HighscoreScreen map="maze" backToSelectionScreenBtnOnClick={callback} />);

  userEvent.click(screen.getByText('Go Back to selection screen'))

  expect(callback).toBeCalledTimes(1)
});
