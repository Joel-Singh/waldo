import getFirebase from "../../firebase";

describe("isCharacterAtPosition", () => {
  let isCharacterAtPosition;
  beforeAll(async () => {
    const firebase = getFirebase();
    const { clearDatabase, addCharacterCoordsToDatabase } = firebase

    isCharacterAtPosition = firebase.isCharacterAtPosition;
    await clearDatabase();
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
      await isCharacterAtPosition("beachWaldo", {
        x: beachWaldoPos.x + 80,
        y: beachWaldoPos.y + 80,
      }, 30)
    ).toBe(false);
  });

  it("returns true when close enough with a tolerance in one axis", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition("beachWaldo", {
        x: beachWaldoPos.x + 80,
        y: beachWaldoPos.y,
      }, 80)
    ).toBe(true);
  });

  it("returns true when close enough with a tolerance in two axis", async () => {
    const beachWaldoPos = { x: 1286, y: 1637 };
    expect(
      await isCharacterAtPosition("beachWaldo", {
        x: beachWaldoPos.x + 30,
        y: beachWaldoPos.y + 28,
      }, 80)
    ).toBe(true);
  });
});
