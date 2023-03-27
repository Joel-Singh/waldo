import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { characterInformation } from "./constants";

async function chooseAllCharactersIn(map) {
  await chooseMultipleCharacters(characterInformation[map].map(({displayName}) => (displayName)));
}

async function chooseMultipleCharacters(displayNameArr) {
  for (const displayName of displayNameArr) {
    await chooseCharacter(displayName);
  }
}

async function chooseCharacter(displayName) {
  await chooseCharacterAtPosition(displayName, 0, 0);
}

async function chooseCharacterAtPosition(displayName, xPos, yPos) {
  const gamescreen = screen.getByTestId("Gamescreen");
  userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

  const charBtn = screen.getByText(displayName);
  await act(async () => {
    userEvent.click(charBtn);
  });
}

export { chooseAllCharactersIn, chooseCharacter, chooseCharacterAtPosition }
