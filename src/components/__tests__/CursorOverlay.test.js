import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import CursorOverlay from "../CursorOverlay";

it("is where the mouse is hovered", () => {
  const { container } = render(<CursorOverlay />);
  const cursorOverlay = container.firstChild;

  const hoverPos = { x: 32, y: 87 };

  userEvent.hover(cursorOverlay, {
    screenX: hoverPos.x,
    screenY: hoverPos.y,
  });

  const style = getComputedStyle(cursorOverlay);

  const styleXValue = style.getPropertyValue("--x");
  const styleYValue = style.getPropertyValue("--y");

  expect(parseInt(styleXValue)).toBe(hoverPos.x);
  expect(parseInt(styleYValue)).toBe(hoverPos.y);
});

it("follows the mouse", () => {
  const { container } = render(<CursorOverlay />);
  const cursorOverlay = container.firstChild;

  const firstHoverPos = { x: 35, y: 81 };

  userEvent.hover(cursorOverlay, {
    screenX: firstHoverPos.x,
    screenY: firstHoverPos.y,
  });

  expect(getStylePropAsNumber(cursorOverlay, '--x')).toBe(firstHoverPos.x);
  expect(getStylePropAsNumber(cursorOverlay, '--y')).toBe(firstHoverPos.y);

  const secondHoverPos = { x: 90, y: 10 };

  userEvent.hover(cursorOverlay, {
    screenX: secondHoverPos.x,
    screenY: secondHoverPos.y,
  });

  expect(getStylePropAsNumber(cursorOverlay, '--x')).toBe(secondHoverPos.x);
  expect(getStylePropAsNumber(cursorOverlay, '--y')).toBe(secondHoverPos.y);

  function getStylePropAsNumber(element, property) {
    const style = getComputedStyle(element)
    const propertyValue = style.getPropertyValue(property)
    return parseInt(propertyValue)
  }
});
