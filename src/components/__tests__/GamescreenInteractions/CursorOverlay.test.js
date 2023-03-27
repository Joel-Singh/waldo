import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import Gamescreen from "../../Gamescreen.js";

test("Cursor overlay is hidden when character picker is visible", () => {
  render(<Gamescreen />);

  const gamescreen = screen.getByTestId("Gamescreen");
  const characterPicker = screen.getByTestId("character-picker");
  const cursorOverlay = screen.getByTestId("cursor-overlay");

  userEvent.click(gamescreen);
  expect(characterPicker).toHaveClass("character-picker--visible");
  expect(cursorOverlay).not.toHaveClass("cursor-overlay--visible");

  userEvent.click(gamescreen);
  expect(characterPicker).not.toHaveClass("character-picker--visible");
  expect(cursorOverlay).toHaveClass("cursor-overlay--visible");
});
