import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { characterInformation } from "./constants";
import getFirebaseFunctions from "./firebase";

async function chooseAllCharactersIn(map) {
  await chooseMultipleCharacters(characterInformation[map].map(({displayName}) => (displayName)));
}

async function chooseMultipleCharacters(displayNameArr) {
  for (const displayName of displayNameArr) {
    await chooseCharacter(displayName);
  }
}

async function chooseCharacter(displayName) {
  if (!(await areFakeCoordsInDatabase()))
    throw new Error("No fake coords in database!")

  await chooseCharacterAtPosition(displayName, 0, 0);

  async function areFakeCoordsInDatabase() {
    const { getCharCoordsInDb } = getFirebaseFunctions()
    const charCoords = await getCharCoordsInDb()

    const coordsAreZero = ({x, y}) => x === 0 && y === 0
    const allCharCoordsAreZero = !Object.entries(charCoords).every(([, coords]) => coordsAreZero(coords))
    if (allCharCoordsAreZero)
      return false

    return true
  }
}

async function chooseCharacterAtPosition(displayName, xPos, yPos) {
  const gamescreen = screen.getByTestId("Gamescreen");
  userEvent.click(gamescreen, { screenX: xPos, screenY: yPos });

  const charBtn = screen.getByText(displayName);
  await act(async () => {
    userEvent.click(charBtn);

    const flushPromises = () =>
      new Promise((resolve) => setTimeout(resolve, 200));

    await flushPromises()
  });
}

export { chooseAllCharactersIn, chooseCharacter, chooseCharacterAtPosition }
