import { Link } from "react-router-dom";

// @ts-ignore
import PropTypes from "prop-types";

import "../styles/mapPreview.css"
function MapPreview(props) {
  const { mapName, previewCharacterInformation, mapImage, mapPath } = props;

  return (
    <div className="map-preview">
      <div aria-label="title" className="map-preview__title white-glow-highlight">
        {mapName}
      </div>
      <img
        src={mapImage}
        alt={`${mapName} map`}
        className="map-preview__map-image"
      />
      <div
        data-testid="previewCharactersContainer"
        className="map-preview__character-container"
      >
        {previewCharacterInformation.map((previewCharacter) =>
          createPreviewCharacterHTML(previewCharacter),
        )}
      </div>
      <Link to={"/" + mapPath}>
        <button type="button" className="map-preview__start-btn">
          START
        </button>
      </Link>
    </div>
  );

  function createPreviewCharacterHTML(previewCharacter) {
    const { name, image } = previewCharacter;
    return (
      <div key={name} className="preview-character">
        <img src={image} alt={name} />
        <div className="preview-character__name white-glow-highlight">{name}</div>
      </div>
    );
  }
}

const possibleMapPaths = ["placeholder1", "maze", "snow", "beach"];
MapPreview.propTypes = {
  mapPath: PropTypes.oneOf(possibleMapPaths).isRequired,
  mapName: PropTypes.string.isRequired,
  previewCharacterInformation: PropTypes.any.isRequired,
  mapImage: PropTypes.string.isRequired,
};

export default MapPreview;
