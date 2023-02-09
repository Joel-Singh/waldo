import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import { useState } from "react";

export default function Gamescreen({ img, characters }) {
  const [characterPickerVisibility, setCharacterPickerVisibility] =
    useState(false);
  const [characterPickerXPos, setCharacterPickerXPos] = useState(0);
  const [characterPickerYPos, setCharacterPickerYPos] = useState(0);

  function onClick({ screenX, screenY}) {
    setCharacterPickerVisibility((prev) => !prev);
    setCharacterPickerXPos(screenX);
    setCharacterPickerYPos(screenY);
  }

  return (
    <div className="gamescreen" data-testid="gamescreen" onClick={onClick}>
      <CharactersOverlay characters={characters} />
      <CharacterPicker
        isVisible={characterPickerVisibility}
        location={{ x: characterPickerXPos, y: characterPickerYPos }}
      />
      <img className="gamescreen__map" src={img} />
    </div>
  );
}
