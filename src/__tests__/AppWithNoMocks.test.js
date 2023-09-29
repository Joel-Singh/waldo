import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App.tsx";
import { chooseAllCharactersIn } from "../util/ChoosingCharacters";
import {
  addRealCharacterCoordsToDatabase,
  clearDatabase,
} from "../util/firebase";

test("Going to the selection screen and selecting a map after completing a game, shows gamescreen", async () => {
  await clearDatabase();
  await addRealCharacterCoordsToDatabase();

  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={[`/`]}>
      <App />
    </MemoryRouter>,
  );

  userEvent.click(getByText("START"));

  await chooseAllCharactersIn("maze");
  userEvent.click(getByText("Go back to selection screen"));

  userEvent.click(getByText("START"));

  expect(getByTestId("Gamescreen")).toBeDefined();
});
