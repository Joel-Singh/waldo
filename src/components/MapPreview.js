import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function MapPreview(props) {
  const { mapName, previewCharacterInformation, mapImage, mapPath } = props;

  return (
    <div>
      <div>{mapName}</div>
      <img src={mapImage} />
      <div data-testid="previewCharactersContainer">
        {previewCharacterInformation.map((previewCharacter) =>
          createPreviewCharacterHTML(previewCharacter)
        )}
      </div>
      <Link to={"/" + mapPath}>
        <button type="buton">START</button>
      </Link>
    </div>
  );
  function createPreviewCharacterHTML(previewCharacter) {
    const { name, image } = previewCharacter;
    return (
      <div key={name}>
        <img src={image} />
        <div>{name}</div>
      </div>
    );
  }
}

const possibleMapPaths = ["placeholder1", "placeholder2"];
MapPreview.propTypes = {
  mapURL: PropTypes.oneOf(possibleMapPaths),
};

export default MapPreview;
