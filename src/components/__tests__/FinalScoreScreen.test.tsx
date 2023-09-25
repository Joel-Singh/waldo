import { render } from "@testing-library/react";
import FinalScoreScreen from "../FinalScoreScreen";

test("finalScoreScreen display passed in final score", () => {
  const { container } = render(<FinalScoreScreen finalScore={32} />);
  expect(container.outerHTML).toContain("32");
})
