import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getGamescreens, getMapPreviews } from "../componentInstantiations";

function snapshotTestComponent(component, testName) {
  test(testName, () => {
    const { container } = render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
}

getComponentsToSnapshotTest().forEach(({ component, name }) =>
  snapshotTestComponent(component, name)
);

function getComponentsToSnapshotTest() {
  const { mazeMapPreview, snowMapPreview, beachMapPreview } = getMapPreviews();

  const {
    maze: mazeGamescreen,
    beach: beachGamescreen,
    snow: snowGamescreen,
  } = getGamescreens();

  const componentsToSnapshotTest = [
    {
      component: mazeMapPreview,
      name: "Maze Map Preview",
    },
    {
      component: snowMapPreview,
      name: "Snow Map Preview",
    },
    {
      component: beachMapPreview,
      name: "Beach Map Preview",
    },
    {
      component: mazeGamescreen,
      name: "Maze Gamescreen",
    },
    {
      component: beachGamescreen,
      name: "Beach Gamescreen",
    },
    {
      component: snowGamescreen,
      name: "Snow Gamescreen",
    },
  ];

  return componentsToSnapshotTest;
}

