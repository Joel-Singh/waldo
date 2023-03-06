import {
  CHOOSING_CHARACTER_TOLERANCE,
  exposeCharacterToleranceAsCssVariable,
} from "../../util/constants";

it("exposes character tolerance as a css variable", async () => {
  exposeCharacterToleranceAsCssVariable();
  const root = document.documentElement;
  const characterToleranceCssValue = Number(
    root.style.getPropertyValue("--choosing-character-tolerance")
  );

  expect(characterToleranceCssValue).toBe(CHOOSING_CHARACTER_TOLERANCE);
});
