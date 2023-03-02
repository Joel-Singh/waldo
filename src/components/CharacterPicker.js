import PropTypes from "prop-types";

function CharacterPicker(props) {
  const {
    isVisible,
    location = { x: 0, y: 0 },
    characterInformation = [],
    onCharacterClickFunc = () => {},
  } = props;

  const visibleClass = isVisible ? " visible" : "";
  return (
    <div
      className={"character-picker --positioned-with-x-y" + visibleClass}
      data-testid="character-picker"
      style={
      {
        '--x': location.x,
        '--y': location.y,
      }
    }
    >
      {buttonsFromCharacterInformation(characterInformation)}
    </div>
  );

  function buttonsFromCharacterInformation(characterInformation) {
    return characterInformation.map(({ displayName, databaseName, isFound }) => {
      if (isFound)
        return null

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
  characterInformation: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      databaseName: PropTypes.string.isRequired,
      isFound: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default CharacterPicker;
