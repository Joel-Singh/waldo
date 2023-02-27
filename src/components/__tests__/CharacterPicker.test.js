import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CharacterPicker from "../CharacterPicker";
import userEvent from "@testing-library/user-event";

it("has visible class when isVisible is true", () => {
  const { container } = render(
    <CharacterPicker characterNames={[]} isVisible={true} />
  );
  const characterPicker = container.firstChild;

  expect(characterPicker).toHaveClass("visible");
});

it("does not have visible class when isVisible is false", () => {
  const { container } = render(
    <CharacterPicker characterNames={[]} isVisible={false} />
  );
  const characterPicker = container.firstChild;

  expect(characterPicker).not.toHaveClass("visible");
});

it("properly renders character names as divs", () => {
  const characterNames = [
    {
      displayName: "Jane",
      databaseName: "Jane databaseName",
    },
    {
      displayName: "Bob",
      databaseName: "Bob databaseName",
    },
    {
      displayName: "Doe",
      databaseName: "Doe databaseName",
    },
  ];

  const { container } = render(
    <CharacterPicker characterNames={characterNames} />
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

it("calls function with database name when character name is clicked", () => {
  const onCharacterClickFunc = jest.fn();

  const characterNames = [
    {
      displayName: "Jane displayName",
      databaseName: "Jane databaseName",
    },
    {
      displayName: "Bob displayName",
      databaseName: "Bob databaseName",
    },
    {
      displayName: "Doe displayName",
      databaseName: "Doe databaseName",
    },
  ];

  render(
    <CharacterPicker
      characterNames={characterNames}
      onCharacterClickFunc={onCharacterClickFunc}
    />
  );

  const bob = screen.getByText("Bob displayName");

  userEvent.click(bob);

  expect(onCharacterClickFunc).toBeCalledWith(
    "Bob databaseName",
    expect.anything()
  );
});

it("calls function with correct position when character name is clicked", () => {
  const onCharacterClickFunc = jest.fn();
  const pos = { x: 8, y: 9 };

  render(
    <CharacterPicker
      onCharacterClickFunc={onCharacterClickFunc}
      location={{ x: pos.x, y: pos.y }}
      characterNames={[
        { displayName: "displayName", databaseName: "databaseName" },
      ]}
    />
  );

  const character = screen.getByText("displayName");
  userEvent.click(character);

  expect(onCharacterClickFunc).toBeCalledWith(expect.anything(), {
    x: pos.x,
    y: pos.y,
  });
});

it("has correct css variables depending on location", () => {
  const pos = { x: 8, y: 9 };

  render(
    <CharacterPicker
      location={{ x: pos.x, y: pos.y }}
      characterNames={[]}
    />
  );

  const characterPicker = screen.getByTestId("character-picker")
  const style = getComputedStyle(characterPicker)

  const styleXValue = style.getPropertyValue('--x')
  const styleYValue = style.getPropertyValue('--y')

  expect(parseInt(styleXValue)).toBe(8)
  expect(parseInt(styleYValue)).toBe(9)
});
