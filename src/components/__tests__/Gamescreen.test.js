import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen from "../Gamescreen.js";
import createCharacter from "../../util/createCharacter.js";

import getFirebaseFunctions from "../../util/firebase.js";
import { getGamescreens } from "../../util/componentInstantiations"
import { act } from "react-dom/test-utils";

describe("Choosing a character", () => {
  beforeAll(async () => {
    const { clearDatabase, addCharacterCoordsToDatabase } =
      getFirebaseFunctions();
    await clearDatabase();
    await addCharacterCoordsToDatabase();
  });

  async function chooseCharacter(name, xPos, yPos) {
    const gamescreen = screen.getByTestId("gamescreen");
    userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

    const charBtn = screen.getByText(name);
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

  function isCharacterFound(name) {
    const characterFromCharacterOverlay = screen.getByAltText(name);
    return characterFromCharacterOverlay.classList.contains("found");
  }

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

test("Character creator utility function", () => {
  const characters = [
    createCharacter(
      "Jeff displayName",
      "Jeff databaseName",
      "placeholder image 1"
    ),
    createCharacter(
      "Jane displayName",
      "Jane databaseName",
      "placeholder image 2"
    ),
    createCharacter(
      "Jeffrey displayName",
      "Jeffrey databaseName",
      "placeholder image 3"
    ),
  ];

  expect(characters).toMatchInlineSnapshot(`
Array [
  Object {
    "databaseName": "Jeff databaseName",
    "displayName": "Jeff displayName",
    "img": "placeholder image 1",
  },
  Object {
    "databaseName": "Jane databaseName",
    "displayName": "Jane displayName",
    "img": "placeholder image 2",
  },
  Object {
    "databaseName": "Jeffrey databaseName",
    "displayName": "Jeffrey displayName",
    "img": "placeholder image 3",
  },
]
`);
});

describe("Character Overlay", () => {
  it("renders a single character", () => {
    const characters = [
      createCharacter(
        "placeholder displayName",
        "placeholder databaseName",
        "placeholder img"
      ),
    ];
    const { container } = render(<Gamescreen characters={characters} />);
    const character = container.querySelector("img[src='placeholder img']");
    expect(character).not.toBeNull();
  });

  it("renders multiple characters", () => {
    const characters = [
      createCharacter(
        "placeholder 1 displayName",
        "placeholder 1 databaseName",
        "placeholder img 1"
      ),
      createCharacter(
        "placeholder 2 displayName",
        "placeholder 2 databaseName",
        "placeholder img 2"
      ),
    ];

    const { container } = render(<Gamescreen characters={characters} />);
    const character1 = container.querySelectorAll(
      "img[src='placeholder img 1']"
    );
    const character2 = container.querySelectorAll(
      "img[src='placeholder img 2']"
    );

    expect(character1).not.toBeNull();
    expect(character2).not.toBeNull();
  });
});

describe("Character picker", () => {
  test("is not initially visible", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");

    expect(characterPicker).not.toHaveClass("character-picker--visible");
  });

  test("is visible after clicking on the Gamescreen", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    userEvent.click(gamescreen);
    expect(characterPicker).toHaveClass("character-picker--visible");
  });

  test("appears on Gamescreen after click and disappears with another click.", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    userEvent.click(gamescreen);
    expect(characterPicker).toHaveClass("character-picker--visible");
    userEvent.click(gamescreen);
    expect(characterPicker).not.toHaveClass("character-picker--visible");
  });

  test("appears on clicked position", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    const xClickPos = 103;
    const yClickPos = 56;

    userEvent.click(gamescreen, { screenX: xClickPos, screenY: yClickPos });

    const characterPickerXPos = parseInt(
      getComputedStyle(characterPicker).getPropertyValue("--x")
    );
    expect(characterPickerXPos).toBe(xClickPos);

    const characterPickerYPos = parseInt(
      getComputedStyle(characterPicker).getPropertyValue("--y")
    );
    expect(characterPickerYPos).toBe(yClickPos);
  });

  test("is rendered in Gamescreen", () => {
    const characters = [
      createCharacter("Jane displayName", "Jane databaseName", "placeholder1"),
      createCharacter("Doe displayName", "Doe databaseName", "placeholder2"),
      createCharacter("Jeff displayName", "Jeff databaseName", "placeholder3"),
    ];

    render(<Gamescreen characters={characters} />);
    const characterPicker = screen.getByTestId("character-picker");

    expect(characterPicker).toMatchInlineSnapshot(`
<div
  class="character-picker --positioned-with-x-y"
  data-testid="character-picker"
  style="--x: 0; --y: 0;"
>
  <button
    type="button"
  >
    Jane displayName
  </button>
  <button
    type="button"
  >
    Doe displayName
  </button>
  <button
    type="button"
  >
    Jeff displayName
  </button>
</div>
`);
  });
});

test("Cursor overlay is hidden when character picker is visible", () => {
  render(<Gamescreen />);

  const gamescreen = screen.getByTestId("gamescreen");
  const characterPicker = screen.getByTestId("character-picker");
  const cursorOverlay = screen.getByTestId('cursor-overlay')

  userEvent.click(gamescreen);
  expect(characterPicker).toHaveClass("character-picker--visible");
  expect(cursorOverlay).not.toHaveClass("cursor-overlay--visible");

  userEvent.click(gamescreen);
  expect(characterPicker).not.toHaveClass("character-picker--visible");
  expect(cursorOverlay).toHaveClass("cursor-overlay--visible");
})
