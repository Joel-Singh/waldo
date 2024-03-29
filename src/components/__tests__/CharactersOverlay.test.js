import { render } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import createCharacter from "../../util/createCharacter";
import CharactersOverlay from "../CharactersOverlay";

it("renders the image of a single character", () => {
  const characters = [
    createCharacter(
      "displayName placeholder",
      "uniqueIdentifier placeholder",
      "image placeholder",
    ),
  ];
  const { container } = render(<CharactersOverlay characters={characters} />);
  const charactersOverlay = container.firstChild;

  expect(charactersOverlay).toMatchInlineSnapshot(`
<div
  class="characters-overlay"
>
  <img
    alt="displayName placeholder"
    src="image placeholder"
  />
</div>
`);
});

test("single character DOESN'T have found class when isFound is false", () => {
  const characters = [
    createCharacter(
      "displayName placeholder",
      "uniqueIdentifier placeholder",
      "image placeholder",
    ),
  ];
  characters[0].isFound = false;

  const { container } = render(<CharactersOverlay characters={characters} />);
  const charactersOverlay = container.firstChild;
  const character = charactersOverlay.firstChild;

  expect(character).not.toHaveClass("found");
});

test("single character DOES have found class when isFound is true", () => {
  const characters = [
    createCharacter(
      "displayName placeholder",
      "uniqueIdentifier placeholder",
      "image placeholder",
    ),
  ];

  characters[0].isFound = true;

  const { container } = render(<CharactersOverlay characters={characters} />);
  const charactersOverlay = container.firstChild;
  const character = charactersOverlay.firstChild;

  expect(character).toHaveClass("found");
});

it("renders the image of multiple characters", () => {
  const characters = [
    createCharacter(
      "displayName placeholder 1",
      "uniqueIdentifier placeholder 1",
      "image placeholder 1",
    ),
    createCharacter(
      "displayName placeholder 2",
      "uniqueIdentifier placeholder 2",
      "image placeholder 2",
    ),
    createCharacter(
      "displayName placeholder 3",
      "uniqueIdentifier placeholder 3",
      "image placeholder 3",
    ),
  ];
  const { container } = render(<CharactersOverlay characters={characters} />);
  const charactersOverlay = container.firstChild;

  expect(charactersOverlay).toMatchInlineSnapshot(`
<div
  class="characters-overlay"
>
  <img
    alt="displayName placeholder 1"
    src="image placeholder 1"
  />
  <img
    alt="displayName placeholder 2"
    src="image placeholder 2"
  />
  <img
    alt="displayName placeholder 3"
    src="image placeholder 3"
  />
</div>
`);
});

it("assigns found class to characters who's isFound is true", () => {
  const characters = [
    createCharacter(
      "name placeholder 1 displayName",
      "name placeholder 1 uniqueIdentifier",
      "image placeholder 1",
    ),
    createCharacter(
      "name placeholder 2 displayName",
      "name placeholder 2 uniqueIdentifier",
      "image placeholder 2",
    ),
    createCharacter(
      "name placeholder 3 displayName",
      "name placeholder 3 uniqueIdentifier",
      "image placeholder 3",
    ),
  ];

  characters[0].isFound = true;
  characters[1].isFound = false;
  characters[2].isFound = true;

  const { container } = render(<CharactersOverlay characters={characters} />);
  const charactersOverlay = container.firstChild;

  const firstCharacter = charactersOverlay.querySelector(
    "img[src='image placeholder 1']",
  );
  const secondCharacter = charactersOverlay.querySelector(
    "img[src='image placeholder 2']",
  );
  const thirdCharacter = charactersOverlay.querySelector(
    "img[src='image placeholder 3']",
  );

  expect(firstCharacter).toHaveClass("found");
  expect(secondCharacter).not.toHaveClass("found");
  expect(thirdCharacter).toHaveClass("found");
});
