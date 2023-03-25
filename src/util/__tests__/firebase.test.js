import { CHOOSING_CHARACTER_TOLERANCE } from "../constants";
import getFirebaseFunctions from "../firebase";

describe("isCharacterAtPosition", () => {
  test.each([
    {
      name: "returns false with wrong position",
      positionToCheck: {x: 1000, y: 1000},
      expectedValue: false,
    },
    {
      name: "returns true with right position",
      positionToCheck: {x: 0, y: 0},
      expectedValue: true,
    },
    {
      name: "returns false when farther than tolerance",
      positionToCheck: {
        x: CHOOSING_CHARACTER_TOLERANCE,
        y: CHOOSING_CHARACTER_TOLERANCE
      },
      expectedValue: false,
    },
    {
      name: "returns true when close enough with tolerance in one axis",
      positionToCheck: {
        x: CHOOSING_CHARACTER_TOLERANCE,
        y: 0
      },
      expectedValue: true,
    },
    {
      name: "returns true when close enough with a tolerance in two axis",
      positionToCheck: {
        x: CHOOSING_CHARACTER_TOLERANCE / 2,
        y: CHOOSING_CHARACTER_TOLERANCE / 2
      },
      expectedValue: true,
    },
  ])('$name', async ({ positionToCheck, expectedValue}) => {
    const { isCharacterAtPosition } = getFirebaseFunctions()
    expect(
      await isCharacterAtPosition(
        "beachWaldo",
        {
          x: positionToCheck.x,
          y: positionToCheck.y,
        },
        CHOOSING_CHARACTER_TOLERANCE
      )
    ).toBe(expectedValue);
  })
});



test("addHighscore and getTopTenHighscores", async () => {
  const { clearHighscores, addHighscore, getTopTenHighscores } =
    getFirebaseFunctions();

   await clearHighscores();

   await addHighscore("maze", "NF", 1);
   await addHighscore("maze", "EA", 2);
   await addHighscore("maze", "AB", 3);
   await addHighscore("maze", "EK", 4);
   await addHighscore("maze", "CD", 5);
   await addHighscore("maze", "EF", 6);
   await addHighscore("maze", "GH", 7);
   await addHighscore("maze", "IJ", 8);
   await addHighscore("maze", "JS", 9);
   await addHighscore("maze", "TS", 10);

  const notTopTenScores = [11, 12]
  await addHighscore("maze", "ZS", notTopTenScores[0]);
  await addHighscore("maze", "TZ", notTopTenScores[1]);

  const highscores = await getTopTenHighscores("maze");

  expect(highscores.length).toBe(10)
  expect(highscores).toMatchInlineSnapshot(`
Array [
  Object {
    "initials": "NF",
    "timeTaken": 1,
  },
  Object {
    "initials": "EA",
    "timeTaken": 2,
  },
  Object {
    "initials": "AB",
    "timeTaken": 3,
  },
  Object {
    "initials": "EK",
    "timeTaken": 4,
  },
  Object {
    "initials": "CD",
    "timeTaken": 5,
  },
  Object {
    "initials": "EF",
    "timeTaken": 6,
  },
  Object {
    "initials": "GH",
    "timeTaken": 7,
  },
  Object {
    "initials": "IJ",
    "timeTaken": 8,
  },
  Object {
    "initials": "JS",
    "timeTaken": 9,
  },
  Object {
    "initials": "TS",
    "timeTaken": 10,
  },
]
`);
});
