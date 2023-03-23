import { render, screen } from "@testing-library/react"
import { MemoryRouter, BrowserRouter } from "react-router-dom"
import App from "./App.js"
import { chooseAllCharactersInMaze } from "./components/__tests__/GamescreenInteractions/ChoosingCharacters.test.js";

jest.mock('./components/HighscoreScreen.js', () => () => {
  return <div data-testid="HighscoreScreen"></div>;
})

it("initially shows gamescreen and initially hides highscore screen for maze", () => {
  render(
    <MemoryRouter initialEntries={['/maze']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByTestId('gamescreen')).toBeDefined()
  expect(screen.queryByTestId('HighscoreScreen')).toBeNull()
})

test("Shows highscore screen and hides gamescreen when all characters are chosen for maze", async () => {
  render(
    <MemoryRouter initialEntries={['/maze']}>
      <App />
    </MemoryRouter>
  )

  await chooseAllCharactersInMaze()

  expect(screen.queryByTestId('gamescreen')).toBeNull()
  expect(screen.getByTestId('HighscoreScreen')).toBeDefined()
})
