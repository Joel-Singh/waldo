import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { characterInformation } from "./constants";
import { MapName } from "./constants";

async function chooseAllCharactersIn(map: MapName) {
  await chooseMultipleCharacters(
    characterInformation[map].map(({ displayName }) => displayName),
    map,
  );
}

async function chooseMultipleCharacters(displayNameArr, map: MapName) {
  for (const displayName of displayNameArr) {
    await chooseCharacter(displayName, map);
  }
}

async function chooseCharacter(displayName, map: MapName) {
  const characterToChoose = characterInformation[map].find(
    (charInfo) => charInfo.displayName === displayName,
  );

  const { x, y } = characterToChoose.coords;
  await chooseCharacterAtPosition(displayName, x, y);
}

async function chooseCharacterAtPosition(displayName, xPos, yPos) {
  const gamescreen = screen.getByTestId("Gamescreen");
  userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

  const charBtn = screen.getByText(displayName);
  await act(async () => {
    userEvent.click(charBtn);

    const flushPromises = () =>
      new Promise((resolve) => setTimeout(resolve, 200));

    await flushPromises();
  });
}

export { chooseAllCharactersIn, chooseCharacter, chooseCharacterAtPosition };
