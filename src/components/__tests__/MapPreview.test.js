import { render, screen } from "@testing-library/react";
import MapPreview from "../MapPreview";
import { BrowserRouter } from "react-router-dom";

it("properly renders preview characters", () => {
  const previewCharacterInformation = [
    { name: "Joel", image: "JoelPlaceholder" },
    { name: "Jane", image: "JanePlaceholder" },
    { name: "Bob", image: "BobPlaceholder" },
  ];

  render(
    <BrowserRouter>
      <MapPreview
        mapPath="placeholder1"
        mapName="placeholder"
        mapImage="placeholder"
        {...{ previewCharacterInformation }}
      />
    </BrowserRouter>,
  );

  const previewCharactersContainer = screen.getByTestId(
    "previewCharactersContainer",
  );

  expect(previewCharactersContainer).toMatchInlineSnapshot(`
<div
  class="map-preview__character-container"
  data-testid="previewCharactersContainer"
>
  <div
    class="preview-character"
  >
    <img
      alt="Joel"
      src="JoelPlaceholder"
    />
    <div
      class="preview-character__name white-glow-highlight"
    >
      Joel
    </div>
  </div>
  <div
    class="preview-character"
  >
    <img
      alt="Jane"
      src="JanePlaceholder"
    />
    <div
      class="preview-character__name white-glow-highlight"
    >
      Jane
    </div>
  </div>
  <div
    class="preview-character"
  >
    <img
      alt="Bob"
      src="BobPlaceholder"
    />
    <div
      class="preview-character__name white-glow-highlight"
    >
      Bob
    </div>
  </div>
</div>
`);
});
