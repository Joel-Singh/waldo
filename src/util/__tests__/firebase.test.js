import getFirebaseFunctions from "../firebase";

describe("isCharacterAtPosition", () => {
  let isCharacterAtPosition;
  beforeAll(async () => {
    const firebase = getFirebaseFunctions();
    const { addCharacterCoordsToDatabase } = firebase;

    isCharacterAtPosition = firebase.isCharacterAtPosition;
    await addCharacterCoordsToDatabase();
  });

  it("returns false with wrong position", async () => {
    expect(await isCharacterAtPosition("beachWaldo", { x: 80, y: 92 })).toBe(
      false
    );
  });

  it("returns true with right position", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition("beachWaldo", {
        x: beachWaldoPos.x,
        y: beachWaldoPos.y,
      })
    ).toBe(true);
  });

  it("returns false when far away with a tolerance", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition(
        "beachWaldo",
        {
          x: beachWaldoPos.x + 80,
          y: beachWaldoPos.y + 80,
        },
        30
      )
    ).toBe(false);
  });

  it("returns true when close enough with a tolerance in one axis", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition(
        "beachWaldo",
        {
          x: beachWaldoPos.x + 80,
          y: beachWaldoPos.y,
        },
        80
      )
    ).toBe(true);
  });

  it("returns true when close enough with a tolerance in two axis", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition(
        "beachWaldo",
        {
          x: beachWaldoPos.x + 30,
          y: beachWaldoPos.y + 28,
        },
        80
      )
    ).toBe(true);
  });
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
