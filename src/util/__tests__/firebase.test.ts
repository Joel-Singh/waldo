import { Character } from "../constants";
import { CHOOSING_CHARACTER_TOLERANCE } from "../constants";
import {
  addFakeCharacterCoordsToDatabase,
  addRealCharacterCoordsToDatabase,
  clearCharacterCoordsInDatabase,
  clearHighscores,
  addHighscore,
  getTopTenHighscores,
  clearDatabase,
  getCharCoordsInDb,
} from "../firebase";

test("addHighscore and getTopTenHighscores", async () => {
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

  const notTopTenScores = [11, 12];
  await addHighscore("maze", "ZS", notTopTenScores[0]);
  await addHighscore("maze", "TZ", notTopTenScores[1]);

  const highscores = await getTopTenHighscores("maze");

  expect(highscores.length).toBe(10);
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

test("getCharCoordsinDb throws error when coords aren't initialized", async () => {
  await clearDatabase();
  await expect(getCharCoordsInDb()).rejects.toThrow(
    "Character coords never initialized in database",
  );
});

test("addCharacterCoordsToDatabase", async () => {
  await clearCharacterCoordsInDatabase();
  await addRealCharacterCoordsToDatabase();
  expect(await getCharCoordsInDb()).toMatchSnapshot();

  await clearCharacterCoordsInDatabase();
  await addFakeCharacterCoordsToDatabase();
  expect(await getCharCoordsInDb()).toMatchSnapshot();
});

describe("Adding dummy highscores", () => {
  test("completely fills top ten if no scores are present", async () => {
    await clearDatabase();
    expect(await getTopTenHighscores("maze")).toMatchSnapshot();
  });

  test("partially fills top ten if some scores are present", async () => {
    await clearDatabase();
    await addHighscore("maze", "JS", 10);
    await addHighscore("maze", "AB", 8);
    await addHighscore("maze", "CD", 6);
    expect(await getTopTenHighscores("maze")).toMatchSnapshot();
  });
});
