import userEvent from "@testing-library/user-event";
import { render, screen, pointer } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen from "../Gamescreen.js";

describe("Character Overlay", () => {
  it("renders a single character", () => {
    const characters = [
      {
        img: 'placeholder img',
        isFound: true
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
        isFound: true
      },
      {
        img: 'placeholder img 2',
        isFound: true
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
});
