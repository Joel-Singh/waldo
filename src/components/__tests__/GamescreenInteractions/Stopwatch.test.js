import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { decisecondToMs } from "../../../util/constants"
import Gamescreen from "../../Gamescreen"

beforeEach(() => jest.useFakeTimers())

it("displays zero before any time has elapsed", () => {
  render(<Gamescreen />)
  expect(screen.queryByText('0.0')).not.toBeNull()
})

it("increments by a decisecond", () => {
  render(<Gamescreen />)

  act(() => {
    jest.advanceTimersByTime(decisecondToMs)
  })

  expect(screen.queryByText('0.1')).not.toBeNull()
})

it("properly keeps track of time", () => {
  render(<Gamescreen />)

  act(() => {
    jest.advanceTimersByTime(10.3 * 1000)
  })

  expect(screen.queryByText('10.3')).not.toBeNull()
})
