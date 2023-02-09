export default function charactersOverlay({ characters }) {

  return (
    <div>
      {characters.map(({ img, isFound }) => {
        return <img src={img} className={isFound ? "found" : null} key={img} />;
      })}
    </div>
  );
}
