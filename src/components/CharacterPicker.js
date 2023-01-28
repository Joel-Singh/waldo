function CharacterPicker(props) {
  const { isVisible } = props;

  const visibleClass = isVisible ? ' visible' : '';
  return (
    <div
      className={"character-picker" + visibleClass}
    >
      Hello World
    </div>
  );
}

export default CharacterPicker;
