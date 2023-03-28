import { render } from "@testing-library/react";
import { chooseCharacter } from "../ChoosingCharacters";
import getFirebaseFunctions from "../firebase";

// The correct function of choose character is
// implicitly tested when its used in other tests
describe("Choose character throws error when", () => {
  const { clearDatabase, addRealCharacterCoordsToDatabase } = getFirebaseFunctions()

  function renderMockGamescreenWithCharacterButton() {
    render(
      <div data-testid="Gamescreen">
        <button>Fake Display Name</button>
      </div>
    )
  }


  it("character coords are initialized with real ones", async () => {
    await clearDatabase()
    await addRealCharacterCoordsToDatabase()
    renderMockGamescreenWithCharacterButton()
    await expect(chooseCharacter())
      .rejects
      .toThrow();
  })
})
