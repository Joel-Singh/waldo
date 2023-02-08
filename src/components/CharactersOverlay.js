export default function charactersOverlay({ characters }) {
  const { img, isFound } = characters[0];

  return (
    <div>
      {characters.map(({ img, isFound }) => {
        return <img src={img} className={isFound ? "found" : null} key={img} />;
      })}
    </div>
  );
}
