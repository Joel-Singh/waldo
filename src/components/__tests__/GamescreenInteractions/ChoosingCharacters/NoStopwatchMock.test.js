import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { chooseAllCharactersIn } from "../../../../util/ChoosingCharacters";
import { getGamescreens } from "../../../../util/componentInstantiations";
import wait from "../../../../util/Wait";

it("is called with time elapsed", async () => {
  const onAllCharactersFound = jest.fn();

  const { maze } = getGamescreens(onAllCharactersFound);
  render(maze);

  const SECONDS_ELAPSED = 0.3;
  await act(async () => {
    await wait(SECONDS_ELAPSED * 1000);
  });
  await chooseAllCharactersIn("maze");

  const firstArgumentOfFirstCall = onAllCharactersFound.mock.calls[0][0];

  expect(firstArgumentOfFirstCall).toBeGreaterThan(SECONDS_ELAPSED);
});
