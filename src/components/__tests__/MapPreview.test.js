import { render, screen } from "@testing-library/react";
import MapPreview from "../MapPreview";

it("properly renders preview characters", () => {
  const previewCharacterInformation = [
    { name: "Joel", image: "JoelPlaceholder" },
    { name: "Jane", image: "JanePlaceholder" },
    { name: "Bob", image: "BobPlaceholder" },
  ];

  render(
    <MapPreview previewCharacterInformation={previewCharacterInformation} />
  );

  const previewCharactersContainer = screen.getByTestId('previewCharactersContainer')

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
