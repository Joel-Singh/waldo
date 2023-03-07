import { render, screen } from "@testing-library/react";
import { decisecondToMs } from "../../util/constants";
import Stopwatch from "../Stopwatch";

it("renders seconds elapsed", () => {
  const secondsElapsed = 32.5;
  render(
    <Stopwatch
      secondsElapsed={secondsElapsed}
      incrementDecisecond={() => {}}
    />
  )

  expect(screen.queryByText('32.5')).not.toBeNull()
})

it("calls incrementDecisecond after a decisecond", () => {
  jest.useFakeTimers()

  const incrementDecisecond = jest.fn()

  render(
    <Stopwatch
      incrementDecisecond={incrementDecisecond}
      secondsElapsed={0}
    />
  )

  jest.advanceTimersByTime(decisecondToMs)

  expect(incrementDecisecond).toBeCalledTimes(1)
})

it("continually calls incrementDecisecond", () => {
  jest.useFakeTimers()

  const incrementDecisecond = jest.fn()

  render(
    <Stopwatch
      incrementDecisecond={incrementDecisecond}
      secondsElapsed={0}
    />
  )

  jest.advanceTimersByTime(decisecondToMs * 5)
  expect(incrementDecisecond).toBeCalledTimes(5)
})
