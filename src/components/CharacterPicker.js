function CharacterPicker(props) {
  const { isVisible, location = { x: 0, y: 0 }, characterNames = [] } = props;

  const visibleClass = isVisible ? " visible" : "";
  return (
    <div
      className={"character-picker" + visibleClass}
      data-x={location.x}
      data-y={location.y}
    >
      {buttonsFromCharacterNames(characterNames)}
    </div>
  );

  function buttonsFromCharacterNames(characterNames) {
    return characterNames.map((name) => (
      <button type="button" key={name}>
        {name}
      </button>
    ));
  }
}

export default CharacterPicker;
