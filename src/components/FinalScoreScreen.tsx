export default function FinalScoreScreen(props: { finalScore: number }) {
  const { finalScore } = props;
  return (
    <div data-testid="FinalScoreScreen">
      <h1>Final Score</h1>
      <p>{finalScore} seconds!</p>
    </div>
  );
}
