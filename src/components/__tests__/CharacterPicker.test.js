import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CharacterPicker from "../CharacterPicker";
import userEvent from "@testing-library/user-event";

it("has visible class when isVisible is true", () => {
  const { container } = render(
    <CharacterPicker characterInformation={[]} isVisible={true} />
  );
  const characterPicker = container.firstChild;

  expect(characterPicker).toHaveClass("visible");
});

it("does not have visible class when isVisible is false", () => {
  const { container } = render(
    <CharacterPicker characterInformation={[]} isVisible={false} />
  );
  const characterPicker = container.firstChild;

  expect(characterPicker).not.toHaveClass("visible");
});

it("properly renders character names as divs", () => {
  const characterInformation = [
    {
      displayName: "Jane",
      databaseName: "Jane databaseName",
      isFound: false,
    },
    {
      displayName: "Bob",
      databaseName: "Bob databaseName",
      isFound: false,
    },
    {
      displayName: "Doe",
      databaseName: "Doe databaseName",
      isFound: false,
    },
  ];

  const { container } = render(
    <CharacterPicker characterInformation={characterInformation} />
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

it("doesn't render character names which have been found", () => {
  const characterInformation = [
    {
      displayName: "Jane",
      databaseName: "Jane databaseName",
      isFound: true,
    },
    {
      displayName: "Bob",
      databaseName: "Bob databaseName",
      isFound: false,
    },
    {
      displayName: "Doe",
      databaseName: "Doe databaseName",
      isFound: false,
    },
  ];

  render(
    <CharacterPicker characterInformation={characterInformation} />
  );

  expect(screen.queryByText('Jane')).toBeNull()
});

it("calls function with database name when character name is clicked", () => {
  const onCharacterClickFunc = jest.fn();

  const characterInformation = [
    {
      displayName: "Jane displayName",
      databaseName: "Jane databaseName",
      isFound: false,
    },
    {
      displayName: "Bob displayName",
      databaseName: "Bob databaseName",
      isFound: false,
    },
    {
      displayName: "Doe displayName",
      databaseName: "Doe databaseName",
      isFound: false
    },
  ];

  render(
    <CharacterPicker
      characterInformation={characterInformation}
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
      characterInformation={[
        {
          displayName: "displayName",
          databaseName: "databaseName",
          isFound: false
        },
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
      characterInformation={[]}
    />
  );

  const characterPicker = screen.getByTestId("character-picker")
  const style = getComputedStyle(characterPicker)

  const styleXValue = style.getPropertyValue('--x')
  const styleYValue = style.getPropertyValue('--y')

  expect(parseInt(styleXValue)).toBe(8)
  expect(parseInt(styleYValue)).toBe(9)
});
