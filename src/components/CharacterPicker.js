function CharacterPicker(props) {
  const { isVisible, location = { x: 0, y: 0 }, characterNames = [] } = props;

  const visibleClass = isVisible ? " visible" : "";
  return (
    <div
      className={"character-picker" + visibleClass}
      data-x={location.x}
      data-y={location.y}
    >
      {divsFromCharacterNames(characterNames)}
    </div>
  );

  function divsFromCharacterNames(characterNames) {
    return characterNames.map((name) => <div key={name}>{name}</div>);
  }
}

export default CharacterPicker;
