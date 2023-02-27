import PropTypes from "prop-types";

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
    return characterNames.map(({ displayName, databaseName }) => {
      return (
        <button
          onClick={() =>
            onCharacterClickFunc(databaseName, { x: location.x, y: location.y })
          }
          type="button"
          key={databaseName}
        >
          {displayName}
        </button>
      );
    });
  }
}

CharacterPicker.propTypes = {
  characterNames: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      databaseName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CharacterPicker;
