import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen, { createCharacter } from "../Gamescreen.js";

import initializeFirebase, {
  addCharacterCoordsToDatabase,
  clearDatabase,
} from "../../firebase.js";
import { getGamescreens } from "../../componentInstantiations.js";

describe("Choosing a character", () => {
  //TODO: A test for clicking in the radius of a character
  // Have a firebase function isCharacterAtPositionWithinRadius({x: 123, y: 903}, 90)
  beforeAll(async () => {
    const { clearDatabase } = initializeFirebase();
    await clearDatabase();
  });

  function chooseCharacter(name, xPos, yPos) {
    const gamescreen = screen.getByTestId("gamescreen");
    userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

    const charBtn = screen.getByText(name);
    userEvent.click(charBtn);
  }

  function isCharacterFound(name) {
    const characterOverlay = screen.getByAltText(name);
    return characterOverlay.classList.contains("found");
  }

  test("at the wrong position doesn't mark them as found", () => {
    const { maze } = getGamescreens();
    render(maze);

    chooseCharacter("Waldo", 89, 36);

    expect(isCharacterFound("Waldo")).toBe(false);
  });
});

test("Character creator utility function", () => {
  const characters = [
    createCharacter("Jeff", "placeholder image 1"),
    createCharacter("Jane", "placeholder image 2"),
    createCharacter("Jeffrey", "placeholder image 3"),
  ];

  expect(characters).toMatchInlineSnapshot(`
Array [
  Object {
    "img": "placeholder image 1",
    "name": "Jeff",
  },
  Object {
    "img": "placeholder image 2",
    "name": "Jane",
  },
  Object {
    "img": "placeholder image 3",
    "name": "Jeffrey",
  },
]
`);
});

describe("Character Overlay", () => {
  it("renders a single character", () => {
    const characters = [
      createCharacter("placeholder", "placeholder img")
    ];
    const { container } = render(<Gamescreen characters={characters} />);
    const character = container.querySelector("img[src='placeholder img']");
    expect(character).not.toBeNull();
  });

  it("renders multiple characters", () => {
    const characters = [
      createCharacter("placeholder 1", "placeholder img 1"),
      createCharacter("placeholder 2", "placeholder img 2"),
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

    expect(characterPicker).not.toHaveClass("visible");
  });

  test("is visible after clicking on the Gamescreen", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    userEvent.click(gamescreen);
    expect(characterPicker).toHaveClass("visible");
  });

  test("appears on Gamescreen after click and disappears with another click.", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    userEvent.click(gamescreen);
    expect(characterPicker).toHaveClass("visible");
    userEvent.click(gamescreen);
    expect(characterPicker).not.toHaveClass("visible");
  });

  test("appears on clicked position", () => {
    render(<Gamescreen />);

    const characterPicker = screen.getByTestId("character-picker");
    const gamescreen = screen.getByTestId("gamescreen");

    const xClickPos = 103;
    const yClickPos = 56;

    userEvent.click(gamescreen, { screenX: xClickPos, screenY: yClickPos });

    const characterPickerXPos = parseInt(
      characterPicker.getAttribute("data-x")
    );
    expect(characterPickerXPos).toBe(xClickPos);

    const characterPickerYPos = parseInt(
      characterPicker.getAttribute("data-y")
    );
    expect(characterPickerYPos).toBe(yClickPos);
  });

  test("is rendered in Gamescreen", () => {
    const characters = [
      createCharacter("Jane", "placeholder1"),
      createCharacter("Doe", "placeholder2"),
      createCharacter("Jeff", "placeholder3"),
    ];

    render(<Gamescreen characters={characters} />);
    const characterPicker = screen.getByTestId("character-picker");

    expect(characterPicker).toMatchInlineSnapshot(`
<div
  class="character-picker"
  data-testid="character-picker"
  data-x="0"
  data-y="0"
>
  <button
    type="button"
  >
    Jane
  </button>
  <button
    type="button"
  >
    Doe
  </button>
  <button
    type="button"
  >
    Jeff
  </button>
</div>
`);
  });
});
