import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen, { createCharacter } from "../Gamescreen.js";

test("Character creator utility function", () => {
  const characters = [
    createCharacter("Jeff", "placeholder image 1", false),
    createCharacter("Jane", "placeholder image 2", true),
    createCharacter("Jeffrey", "placeholder image 3", true),
  ];

  expect(characters).toMatchInlineSnapshot(`
Array [
  Object {
    "img": "placeholder image 1",
    "isFound": false,
    "name": "Jeff",
  },
  Object {
    "img": "placeholder image 2",
    "isFound": true,
    "name": "Jane",
  },
  Object {
    "img": "placeholder image 3",
    "isFound": true,
    "name": "Jeffrey",
  },
]
`);
});

describe("Character Overlay", () => {
  it("renders a single character", () => {
    const characters = [
      createCharacter("placeholder", "placeholder img", true)
    ];
    const { container } = render(<Gamescreen characters={characters} />);
    const character = container.querySelector("img[src='placeholder img']");
    expect(character).not.toBeNull();
  });

  it("renders multiple characters", () => {
    const characters = [
      createCharacter("placeholder 1", "placeholder img 1", true),
      createCharacter("placeholder 2", "placeholder img 2", true),
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
      createCharacter("Jane", "placeholder1", false),
      createCharacter("Doe", "placeholder2", false),
      createCharacter("Jeff", "placeholder3", false),
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
