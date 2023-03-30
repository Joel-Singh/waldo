import { render } from "@testing-library/react";
import { chooseCharacter } from "../ChoosingCharacters";
import { clearDatabase, addRealCharacterCoordsToDatabase } from "../firebase";

// The correct function of choose character is
// implicitly tested when its used in other tests
describe("Choose character throws error when", () => {
  function renderMockGamescreenWithCharacterButton() {
    render(
      <div data-testid="Gamescreen">
        <button>Fake Display Name</button>
      </div>
    );
  }

  it("character coords are initialized with real ones", async () => {
    await clearDatabase();
    await addRealCharacterCoordsToDatabase();
    renderMockGamescreenWithCharacterButton();
    await expect(chooseCharacter()).rejects.toThrow(
      "No fake coords in database!"
    );
  });
});
