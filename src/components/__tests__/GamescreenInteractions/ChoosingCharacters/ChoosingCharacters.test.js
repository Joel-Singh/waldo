import { render, screen } from "@testing-library/react";

import { addRealCharacterCoordsToDatabase } from "../../../../util/firebase.js";
import { getGamescreens } from "../../../../util/componentInstantiations";
import {
  chooseAllCharactersIn,
  chooseCharacter,
  chooseCharacterAtPosition,
} from "../../../../util/ChoosingCharacters";

function isCharacterFound(name) {
  const characterFromCharacterOverlay = screen.getByAltText(name);
  return characterFromCharacterOverlay.classList.contains("found");
}

jest.mock("../../../../components/Stopwatch.js", () => () => {
  return <div></div>;
});

beforeAll(async () => {
  await addRealCharacterCoordsToDatabase();
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

    await chooseCharacter(mazeWaldoDisplayName, "maze");

    expect(isCharacterFound(mazeWaldoDisplayName)).toBe(true);
  });
});

describe("onAllCharactersFound", () => {
  it("is not called when choosing one character", async () => {
    const onAllCharactersFound = jest.fn();

    const { maze } = getGamescreens(onAllCharactersFound);
    render(maze);

    await chooseCharacter("Waldo", "maze");

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
