export default function CharactersOverlay({ characters = [] }) {
  return (
    <div>
      {characters.map(({ img, isFound, name }) => {
        return <img alt={name} src={img} className={isFound ? "found" : null} key={img} />;
      })}
    </div>
  );
}
