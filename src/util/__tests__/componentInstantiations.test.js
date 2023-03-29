import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getGamescreens, getMapPreviews } from "../componentInstantiations";
import { allMaps } from "../constants";

function snapshotTestComponent(component, testName) {
  test(testName, () => {
    const { container } = render(<BrowserRouter>{component}</BrowserRouter>);
    expect(container).toMatchSnapshot();
  });
}

getComponentsToSnapshotTest().forEach(({ component, name }) =>
  snapshotTestComponent(component, name)
);

function getComponentsToSnapshotTest() {
  const componentsToSnapshotTest = [
    ...allMaps.map((map) => {
      return {
        component: getMapPreviews()[map],
        name: `${map} Map Preview`,
      };
    }),
    ...allMaps.map((map) => ({
      component: getGamescreens()[map],
      name: `${map} Gamescreen`,
    })),
  ];

  return componentsToSnapshotTest;
}
