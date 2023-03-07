import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen from "../../Gamescreen.js";
import createCharacter from "../../../util/createCharacter.js";



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
