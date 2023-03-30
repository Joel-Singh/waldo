import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toHaveClass } from "@testing-library/jest-dom/extend-expect";
import CursorOverlay from "../CursorOverlay";

it("is where the mouse is hovered", () => {
  const { container } = render(<CursorOverlay />);
  const cursorOverlay = container.firstChild;
  const body = document.querySelector("body");

  const hoverPos = { x: 32, y: 87 };

  userEvent.hover(body, {
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
  const body = document.querySelector("body");

  const firstHoverPos = { x: 35, y: 81 };

  userEvent.hover(body, {
    screenX: firstHoverPos.x,
    screenY: firstHoverPos.y,
  });

  expect(getStylePropAsNumber(cursorOverlay, "--x")).toBe(firstHoverPos.x);
  expect(getStylePropAsNumber(cursorOverlay, "--y")).toBe(firstHoverPos.y);

  const secondHoverPos = { x: 90, y: 10 };

  userEvent.hover(cursorOverlay, {
    screenX: secondHoverPos.x,
    screenY: secondHoverPos.y,
  });

  expect(getStylePropAsNumber(cursorOverlay, "--x")).toBe(secondHoverPos.x);
  expect(getStylePropAsNumber(cursorOverlay, "--y")).toBe(secondHoverPos.y);

  function getStylePropAsNumber(element, property) {
    const style = getComputedStyle(element);
    const propertyValue = style.getPropertyValue(property);
    return parseInt(propertyValue);
  }
});

it("is not visible when isVisible is false", () => {
  const { container } = render(<CursorOverlay isVisible={false} />);
  const cursorOverlay = container.firstChild;

  expect(cursorOverlay).not.toHaveClass("cursor-overlay--visible");
});

it("is visible when isVisible is true", () => {
  const { container } = render(<CursorOverlay isVisible={true} />);
  const cursorOverlay = container.firstChild;

  expect(cursorOverlay).toHaveClass("cursor-overlay--visible");
});
