import { render } from "@testing-library/react"
import HighscoreScreen from "../HighscoreScreen"

test("Highscore screen renders", () => {
  const { container: { firstChild : highscoreScreen} } = render(<HighscoreScreen />)

  expect(highscoreScreen).toBeDefined()
})
