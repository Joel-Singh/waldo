import { Character, CHOOSING_CHARACTER_TOLERANCE } from "../constants";
import isCharacterAtPosition from "../isCharacterAtPosition";

const dummyCharacter: Character = {
  uniqueIdentifier: "dummyCharacter",
  image: "image",
  displayName: "dummyCharacter",
  coords: { x: 0, y: 0 },
};

jest.mock("../constants", () => {
  const originalConstants = jest.requireActual("../constants");
  return {
    ...originalConstants,
    flattenedCharacterInformation: [
      ...originalConstants.flattenedCharacterInformation,
      dummyCharacter,
    ],
  };
});

describe("isCharacterAtPosition", () => {
  const { x: dummyX, y: dummyY } = dummyCharacter.coords
  test.each([
    {
      name: "returns false with wrong position",
      positionToCheck: { x: dummyX + 1000, y: dummyY + 1000 },
      expectedValue: false,
    },
    {
      name: "returns true with right position",
      positionToCheck: { x: dummyX, y: dummyY },
      expectedValue: true,
    },
    {
      name: "returns false when farther than tolerance",
      positionToCheck: {
        x: dummyX + CHOOSING_CHARACTER_TOLERANCE,
        y: dummyY + CHOOSING_CHARACTER_TOLERANCE,
      },
      expectedValue: false,
    },
    {
      name: "returns true when close enough with tolerance in one axis",
      positionToCheck: {
        x: CHOOSING_CHARACTER_TOLERANCE,
        y: 0,
      },
      expectedValue: true,
    },
    {
      name: "returns true when close enough with a tolerance in two axis",
      positionToCheck: {
        x: dummyX + (CHOOSING_CHARACTER_TOLERANCE / 2),
        y: dummyY + (CHOOSING_CHARACTER_TOLERANCE / 2),
      },
      expectedValue: true,
    },
  ])("$name", async ({ positionToCheck, expectedValue }) => {
    expect(
      isCharacterAtPosition(
        dummyCharacter.uniqueIdentifier,
        {
          x: positionToCheck.x,
          y: positionToCheck.y,
        },
        CHOOSING_CHARACTER_TOLERANCE,
      ),
    ).toBe(expectedValue);
  });
});
