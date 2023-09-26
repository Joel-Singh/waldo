import { MouseEventHandler } from "react";

export default function FinalScoreScreen(props: {
  finalScore: number;
  backToSelectionScreenBtnOnClick?: MouseEventHandler<HTMLElement>;
}) {
  const {
    finalScore,
    backToSelectionScreenBtnOnClick = (e) => {}
  } = props;
  return (
    <div data-testid="FinalScoreScreen">
      <h1>Final Score</h1>
      <p>{finalScore} seconds!</p>
      <button onClick={backToSelectionScreenBtnOnClick}>
        Go back to selection screen
      </button>
    </div>
  );
}
