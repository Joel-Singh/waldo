import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

export type FinalScoreScreenProps = {
  finalScore: number;
  backToSelectionScreenBtnOnClick?: MouseEventHandler<HTMLElement>;
}

export default function FinalScoreScreen(props: FinalScoreScreenProps) {
  const {
    finalScore,
    backToSelectionScreenBtnOnClick = (e) => {}
  } = props;
  return (
    <div data-testid="FinalScoreScreen">
      <h1>Final Score</h1>
      <p>{finalScore} seconds!</p>

      <Link
        to={"/"}
        className="highscoreScreen__back-btn"
      >
        <button onClick={backToSelectionScreenBtnOnClick}>
          Go back to selection screen
        </button>
      </Link>
    </div>
  );
}
