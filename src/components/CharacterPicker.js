function CharacterPicker(props) {
  const { isVisible, location = { x: 0, y: 0 } } = props;

  const visibleClass = isVisible ? " visible" : "";
  return (
    <div
      className={"character-picker" + visibleClass}
      data-x={location.x}
      data-y={location.y}
    >
      Hello World
    </div>
  );
}

export default CharacterPicker;
