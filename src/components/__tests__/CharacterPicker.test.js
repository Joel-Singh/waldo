import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CharacterPicker from "../CharacterPicker";
import userEvent from "@testing-library/user-event";

it("has visible class when isVisible is true", () => {
  const { container } = render(<CharacterPicker isVisible={true} />);
  const characterPicker = container.firstChild;

  expect(characterPicker).toHaveClass("visible");
});

it("does not have visible class when isVisible is false", () => {
  const { container } = render(<CharacterPicker isVisible={false} />);
  const characterPicker = container.firstChild;

  expect(characterPicker).not.toHaveClass("visible");
});

it("properly renders character names as divs", () => {
  const { container } = render(
    <CharacterPicker characterNames={["Jane", "Bob", "Doe"]} />
  );
  const characterPicker = container.firstChild;
  const characterDivs = characterPicker.querySelectorAll(":scope > *");

  expect(characterDivs).toMatchInlineSnapshot(`
    NodeList [
      <button
        type="button"
      >
        Jane
      </button>,
      <button
        type="button"
      >
        Bob
      </button>,
      <button
        type="button"
      >
        Doe
      </button>,
    ]
  `);
});

it("calls function with character name when character name is clicked", () => {
  const onCharacterClickFunc = jest.fn();

  render(
    <CharacterPicker
      characterNames={["Jane", "Bob", "Doe"]}
      onCharacterClickFunc={onCharacterClickFunc}
    />
  );

  const bob = screen.getByText("Bob");

  userEvent.click(bob);

  expect(onCharacterClickFunc).toBeCalledWith("Bob");
});