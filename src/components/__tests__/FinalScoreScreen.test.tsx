import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FinalScoreScreen from "../FinalScoreScreen";

test("finalScoreScreen display passed in final score", () => {
  const { container } = render(<FinalScoreScreen finalScore={32} />);
  expect(container.outerHTML).toContain("32");
})

test("backToSelectionScreenBtnOnClick properly passed into button", () => {
  const mockFunc = jest.fn();
  const { getByText } = render(<FinalScoreScreen finalScore={32} backToSelectionScreenBtnOnClick={mockFunc} />);
  const backToSelectionScreenBtn = getByText("Go back to selection screen");
  userEvent.click(backToSelectionScreenBtn);
  expect(mockFunc).toBeCalled();
})
