function MapPreview(props) {
  const { previewCharacterInformation } = props;

  return (
    <div data-testid="previewCharactersContainer">
      {previewCharacterInformation.map((previewCharacter) =>
        createPreviewCharacterHTML(previewCharacter)
      )}
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
