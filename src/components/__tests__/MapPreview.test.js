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
    </BrowserRouter>
  );

  const previewCharactersContainer = screen.getByTestId(
    "previewCharactersContainer"
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
      src="JoelPlaceholder"
    />
    <div
      class="preview-character__name"
    >
      Joel
    </div>
  </div>
  <div
    class="preview-character"
  >
    <img
      src="JanePlaceholder"
    />
    <div
      class="preview-character__name"
    >
      Jane
    </div>
  </div>
  <div
    class="preview-character"
  >
    <img
      src="BobPlaceholder"
    />
    <div
      class="preview-character__name"
    >
      Bob
    </div>
  </div>
</div>
`);
});
