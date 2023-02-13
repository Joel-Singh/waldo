import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen from "../Gamescreen.js";

describe("Character Overlay", () => {
  it("renders a single character", () => {
    const characters = [
      {
        img: 'placeholder img',
        isFound: true,
        name: "placeholder",
      },
    ]
    const { container }  = render(<Gamescreen characters={characters} />)
    const character = container.querySelector("img[src='placeholder img']")
    expect(character).not.toBeNull();
  })

  it("renders multiple characters", () => {
    const characters = [
      {
        img: 'placeholder img 1',
        isFound: true,
        name: "placeholder 1",
      },
      {
        img: 'placeholder img 2',
        isFound: true,
        name: "placeholder 2",
      },
    ]
    const { container }  = render(<Gamescreen characters={characters} />)
    const character1 = container.querySelectorAll("img[src='placeholder img 1']")
    const character2 = container.querySelectorAll("img[src='placeholder img 2']")

    expect(character1).not.toBeNull();
    expect(character2).not.toBeNull();
  })
})

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
      {
        img: "placeholder1",
        isFound: false,
        name: "Jane",
      },
      {
        img: "placeholder2",
        isFound: false,
        name: "Doe",
      },
      {
        img: "placeholder3",
        isFound: false,
        name: "Jeff",
      },
    ]

    render(<Gamescreen characters={characters} />);
    const characterPicker = screen.getByTestId('character-picker')

    expect(characterPicker).toMatchInlineSnapshot
      (`
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
`)
  });
});
