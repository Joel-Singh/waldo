import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { addFakeCharacterCoordsToDatabase } from "../../../../util/firebase.js";
import { getGamescreens } from "../../../../util/componentInstantiations";
import { act } from "react-dom/test-utils";
import {
  chooseAllCharactersIn,
  chooseCharacter,
  chooseCharacterAtPosition,
} from "../../../../util/ChoosingCharacters.js";

function isCharacterFound(name) {
  const characterFromCharacterOverlay = screen.getByAltText(name);
  return characterFromCharacterOverlay.classList.contains("found");
}

jest.mock("../../../../components/Stopwatch.js", () => () => {
  return <div></div>;
});

beforeAll(async () => {
  await addFakeCharacterCoordsToDatabase();
});

describe("Choosing a character", () => {
  test("at the wrong position doesn't mark them as found", async () => {
    const { maze } = getGamescreens();
    render(maze);

    const mazeWaldoDisplayName = "Waldo";
    await chooseCharacterAtPosition(mazeWaldoDisplayName, 100, 100);

    expect(isCharacterFound(mazeWaldoDisplayName)).toBe(false);
  });

  test("at the right position marks them as found", async () => {
    const { maze } = getGamescreens();
    render(maze);

    const mazeWaldoDisplayName = "Waldo";

    await chooseCharacter(mazeWaldoDisplayName);

    expect(isCharacterFound(mazeWaldoDisplayName)).toBe(true);
  });
});

describe("onAllCharactersFound", () => {
  it("is not called when choosing one character", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    await chooseCharacter("Waldo");

    expect(onAllCharactersFound).not.toBeCalled();
  });

  it("is called when choosing all characters", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    await chooseAllCharactersIn("maze");

    expect(onAllCharactersFound).toBeCalled();
  });
});
