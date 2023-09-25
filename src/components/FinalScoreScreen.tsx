export default function FinalScoreScreen(props: { finalScore: number }) {
  const { finalScore } = props;
  return (
    <div data-testid="FinalScoreScreen">Final score: {finalScore} seconds</div>
  );
}
