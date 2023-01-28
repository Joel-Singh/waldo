
import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CharacterPicker from "../CharacterPicker";

test("Has visible class when isVisible is true", () => {
  const { container } = render(<CharacterPicker isVisible={true}/>);
  const characterPicker = container.firstChild;

  expect(characterPicker).toHaveClass('visible')
})

test("does not have visible class when isVisible is false", () => {
  const { container } = render(<CharacterPicker isVisible={false}/>);
  const characterPicker = container.firstChild;

  expect(characterPicker).not.toHaveClass('visible')
})
