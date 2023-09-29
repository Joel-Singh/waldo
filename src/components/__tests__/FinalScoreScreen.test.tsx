import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import FinalScoreScreen, { FinalScoreScreenProps } from "../FinalScoreScreen";

function renderFinalScoreScreen(props: FinalScoreScreenProps) {
  return render(<BrowserRouter>{FinalScoreScreen(props)}</BrowserRouter>);
}

test("finalScoreScreen display passed in final score", () => {
  const { container } = renderFinalScoreScreen({ finalScore: 32 });
  expect(container.outerHTML).toContain("32");
});

test("backToSelectionScreenBtnOnClick properly passed into button", () => {
  const mockFunc = jest.fn();
  const { getByText } = renderFinalScoreScreen({
    finalScore: 32,
    backToSelectionScreenBtnOnClick: mockFunc,
  });
  const backToSelectionScreenBtn = getByText("Go back to selection screen");
  userEvent.click(backToSelectionScreenBtn);
  expect(mockFunc).toBeCalled();
});
