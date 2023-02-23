import initializeFirebase from "../../firebase";

describe("isCharacterAtPosition", () => {
  let isCharacterAtPosition;
  beforeAll(async () => {
    const firebase = initializeFirebase();

    isCharacterAtPosition = firebase.isCharacterAtPosition;
    firebase.clearDatabase();
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
});
