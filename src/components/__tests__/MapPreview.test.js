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
  data-testid="previewCharactersContainer"
>
  <div>
    <img
      src="JoelPlaceholder"
    />
    <div>
      Joel
    </div>
  </div>
  <div>
    <img
      src="JanePlaceholder"
    />
    <div>
      Jane
    </div>
  </div>
  <div>
    <img
      src="BobPlaceholder"
    />
    <div>
      Bob
    </div>
  </div>
</div>
`);
});
