import { render, screen } from "@testing-library/react";
import createCharacter from "../../../util/createCharacter.js";

import Gamescreen from "../../Gamescreen.js";

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

