import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import getFirebaseFunctions from "../../../util/firebase.js";
import { getGamescreens } from "../../../util/componentInstantiations";
import { act } from "react-dom/test-utils";

async function chooseCharacter(displayName, xPos, yPos) {
  const gamescreen = screen.getByTestId("gamescreen");
  userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

  const charBtn = screen.getByText(displayName);
  await act(async () => {
    userEvent.click(charBtn);
    // This promise that resolves immediately
    // Makes an act error go away.
    // This is due to the click causing a
    // database request.
    // Weird js event loop black magic
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function chooseAllCharactersInMaze() {
    const characters = [
      {
        displayName: "Yellow Hair Person",
        coords: { x: 1929, y: 209 },
      },
      {
        displayName: "Waldo",
        coords: { x: 1377, y: 653 },
      },
      {
        displayName: "Bird Person",
        coords: { x: 1435, y: 687 },
      },
    ];

    for (const {
      displayName,
      coords: { x, y },
    } of characters) {
      await chooseCharacter(displayName, x, y);
    }
}

function isCharacterFound(name) {
  const characterFromCharacterOverlay = screen.getByAltText(name);
  return characterFromCharacterOverlay.classList.contains("found");
}

beforeAll(async () => {
  const { clearDatabase, addCharacterCoordsToDatabase } =
    getFirebaseFunctions();
  await clearDatabase();
  await addCharacterCoordsToDatabase();
});

afterAll(async () => {
  const { clearDatabase } = getFirebaseFunctions();
  await clearDatabase();
});

describe("Choosing a character", () => {
  test("at the wrong position doesn't mark them as found", async () => {
    const { maze } = getGamescreens();
    render(maze);

    const mazeWaldoDisplayName = "Waldo";
    const mazeWaldoPos = { x: 1377, y: 653 };

    await chooseCharacter(mazeWaldoDisplayName, 89, 36);

    expect(isCharacterFound(mazeWaldoDisplayName)).toBe(false);
  });

  test("at the right position marks them as found", async () => {
    const { maze } = getGamescreens();
    render(maze);

    const mazeWaldoDisplayName = "Waldo";
    const mazeWaldoPos = { x: 1377, y: 653 };

    await chooseCharacter(mazeWaldoDisplayName, mazeWaldoPos.x, mazeWaldoPos.y);

    expect(isCharacterFound(mazeWaldoDisplayName)).toBe(true);
  });
});

describe("onAllCharactersFound", () => {
  it("is not called when choosing one character", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    const waldo = {
      displayName: "Waldo",
      coords: { x: 1377, y: 653 },
    };
    const {
      displayName,
      coords: { x, y },
    } = waldo;

    await chooseCharacter(displayName, x, y);

    expect(onAllCharactersFound).not.toBeCalled();
  });

  it("is called when choosing all characters", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    await chooseAllCharactersInMaze()

    expect(onAllCharactersFound).toBeCalled();
  });

  it.only("is called with time elapsed", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    const SECONDS_ELAPSED = 0.3;
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, SECONDS_ELAPSED * 1000))
    })
    await chooseAllCharactersInMaze()

    const firstArgumentOfFirstCall = onAllCharactersFound.mock.calls[0][0];
    const TOLERANCE = 0.2
    const withinTolerance = Math.abs(firstArgumentOfFirstCall - SECONDS_ELAPSED) < TOLERANCE

    expect(withinTolerance).toBe(true)
  })
});
