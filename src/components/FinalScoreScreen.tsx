import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "../styles/finalScoreScreen.css";

export type FinalScoreScreenProps = {
  finalScore: number;
  backToSelectionScreenBtnOnClick?: MouseEventHandler<HTMLElement>;
};

export default function FinalScoreScreen(props: FinalScoreScreenProps) {
  const { finalScore, backToSelectionScreenBtnOnClick = (e) => {} } = props;
  return (
    <div data-testid="FinalScoreScreen" className="final-score-screen">
      <h1 className="final-score-screen__header white-glow-highlight">Final Score</h1>
      <p className="final-score-screen__final-score white-glow-highlight">{finalScore.toFixed(2)} seconds!</p>

      <Link to={"/"} className="finalScoreScreen__back-btn">
        <button onClick={backToSelectionScreenBtnOnClick}>
          Go back to selection screen
        </button>
      </Link>
    </div>
  );
}
