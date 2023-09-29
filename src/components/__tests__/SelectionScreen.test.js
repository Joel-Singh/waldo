import { render, screen } from "@testing-library/react";
import MapPreview from "../MapPreview";
import SelectionScreen from "../SelectionScreen";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

function getMaps() {
  const spaceMap = (
    <MapPreview
      mapPath="placeholder1"
      mapName="space"
      mapImage="placeholder"
      previewCharacterInformation={[]}
    />
  );

  const forestMap = (
    <MapPreview
      mapPath="placeholder1"
      mapName="forest"
      mapImage="placeholder"
      previewCharacterInformation={[]}
    />
  );

  const shipMap = (
    <MapPreview
      mapPath="placeholder1"
      mapName="ship"
      mapImage="placeholder"
      previewCharacterInformation={[]}
    />
  );

  return {
    spaceMap,
    forestMap,
    shipMap,
  };
}

it("renders a single MapPreview", () => {
  const { spaceMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap]} />
    </BrowserRouter>,
  );

  const mapDisplayed = screen.getByLabelText("title").textContent;

  expect(mapDisplayed).toBe("space");
});

test("next button switches map", () => {
  const { spaceMap, forestMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap]} />
    </BrowserRouter>,
  );

  const nextButton = screen.getByLabelText("next map");
  userEvent.click(nextButton);

  const mapDisplayed = screen.getByLabelText("title").textContent;
  expect(mapDisplayed).toBe("forest");
});

test("next button switches map multiple times", () => {
  const { spaceMap, forestMap, shipMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap, shipMap]} />
    </BrowserRouter>,
  );

  const nextButton = screen.getByLabelText("next map");

  function getCurrentTitle() {
    return screen.getByLabelText("title").textContent;
  }

  expect(getCurrentTitle()).toBe("space");

  userEvent.click(nextButton);
  expect(getCurrentTitle()).toBe("forest");

  userEvent.click(nextButton);
  expect(getCurrentTitle()).toBe("ship");
});

test("next button wraps to first map", () => {
  const { spaceMap, forestMap, shipMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap, shipMap]} />
    </BrowserRouter>,
  );

  const nextButton = screen.getByLabelText("next map");

  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);

  const mapDisplayed = screen.getByLabelText("title").textContent;
  expect(mapDisplayed).toBe("space");
});

test("previous button switches map", () => {
  const { spaceMap, forestMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap]} />
    </BrowserRouter>,
  );

  const previousButton = screen.getByLabelText("previous map");
  userEvent.click(previousButton);

  const mapDisplayed = screen.getByLabelText("title").textContent;
  expect(mapDisplayed).toBe("forest");
});

test("previous button switches map multiple times", () => {
  const { spaceMap, forestMap, shipMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap, shipMap]} />
    </BrowserRouter>,
  );

  const previousButton = screen.getByLabelText("previous map");

  function getCurrentTitle() {
    return screen.getByLabelText("title").textContent;
  }

  expect(getCurrentTitle()).toBe("space");

  userEvent.click(previousButton);
  expect(getCurrentTitle()).toBe("ship");

  userEvent.click(previousButton);
  expect(getCurrentTitle()).toBe("forest");
});

test("previous button wraps around", () => {
  const { spaceMap, forestMap, shipMap } = getMaps();

  render(
    <BrowserRouter>
      <SelectionScreen mapPreviews={[spaceMap, forestMap, shipMap]} />
    </BrowserRouter>,
  );

  const previousButton = screen.getByLabelText("previous map");

  userEvent.click(previousButton);
  userEvent.click(previousButton);
  userEvent.click(previousButton);

  const mapDisplayed = screen.getByLabelText("title").textContent;
  expect(mapDisplayed).toBe("space");
});
