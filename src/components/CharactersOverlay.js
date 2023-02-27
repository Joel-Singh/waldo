export default function CharactersOverlay({ characters = [] }) {
  return (
    <div className="characters-overlay">
      {characters.map(({ img, isFound, displayName }) => {
        return (
          <img
            alt={displayName}
            src={img}
            className={isFound ? "found" : null}
            key={img}
          />
        );
      })}
    </div>
  );
}
