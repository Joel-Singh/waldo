function CharacterPicker(props) {
  const {
    isVisible,
    location = { x: 0, y: 0 },
    characterNames = [],
    onCharacterClickFunc = () => {},
  } = props;

  const visibleClass = isVisible ? " visible" : "";
  return (
    <div
      className={"character-picker" + visibleClass}
      data-x={location.x}
      data-y={location.y}
      data-testid="character-picker"
    >
      {buttonsFromCharacterNames(characterNames)}
    </div>
  );

  function buttonsFromCharacterNames(characterNames) {
    return characterNames.map((name) => {
      return (
        <button
          onClick={() => onCharacterClickFunc(name)}
          type="button"
          key={name}
        >
          {name}
        </button>
      );
    });
  }
}

export default CharacterPicker;
