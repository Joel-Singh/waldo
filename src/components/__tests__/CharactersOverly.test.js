import { render, screen } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CharactersOverly from "../CharactersOverlay";

it("renders the image of a single character", () => {
  const characters = [
    {
      img: "image placeholder",
    },
  ];
  const { container } = render(<CharactersOverly characters={characters} />);
  const charactersOverlay = container.firstChild;

  expect(charactersOverlay).toMatchInlineSnapshot(`
<div>
  <img
    src="image placeholder"
  />
</div>
`);
});

test("single character DOESN'T have found class when isFound is false", () => {
  const characters = [
    {
      img: "image placeholder",
      isFound: false,
    },
  ];
  const { container } = render(<CharactersOverly characters={characters} />);
  const charactersOverlay = container.firstChild;
  const character = charactersOverlay.firstChild;

  expect(character).not.toHaveClass("found");
});

test("single character DOES have found class when isFound is true", () => {
  const characters = [
    {
      img: "image placeholder",
      isFound: true,
    },
  ];
  const { container } = render(<CharactersOverly characters={characters} />);
  const charactersOverlay = container.firstChild;
  const character = charactersOverlay.firstChild;

  expect(character).toHaveClass("found");
});

it("renders the image of multiple characters", () => {
  const characters = [
    {
      img: "image placeholder 1",
    },
    {
      img: "image placeholder 2",
    },
    {
      img: "image placeholder 3",
    },
  ];
  const { container } = render(<CharactersOverly characters={characters} />);
  const charactersOverlay = container.firstChild;

  expect(charactersOverlay).toMatchInlineSnapshot(`
<div>
  <img
    src="image placeholder 1"
  />
  <img
    src="image placeholder 2"
  />
  <img
    src="image placeholder 3"
  />
</div>
`);
});

it("assigns found class to characters who's isFound is true", () => {
  const characters = [
    {
      img: "image placeholder 1",
      isFound: true
    },
    {
      img: "image placeholder 2",
      isFound: false
    },
    {
      img: "image placeholder 3",
      isFound: true
    },
  ];
  const { container } = render(<CharactersOverly characters={characters} />);
  const charactersOverlay = container.firstChild;

  const firstCharacter = charactersOverlay.querySelector("img[src='image placeholder 1']")
  const secondCharacter = charactersOverlay.querySelector("img[src='image placeholder 2']")
  const thirdCharacter = charactersOverlay.querySelector("img[src='image placeholder 3']")

  expect(firstCharacter).toHaveClass('found')
  expect(secondCharacter).not.toHaveClass('found')
  expect(thirdCharacter).toHaveClass('found')
});
