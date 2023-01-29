function MapPreview(props) {
  const { previewCharacterInformation, mapImage } = props;

  return (
    <div>
      <img src={mapImage} />
      <div data-testid="previewCharactersContainer">
        {previewCharacterInformation.map((previewCharacter) =>
          createPreviewCharacterHTML(previewCharacter)
        )}
      </div>
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

export default MapPreview;
