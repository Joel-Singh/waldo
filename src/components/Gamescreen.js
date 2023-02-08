import CharacterPicker from "./CharacterPicker.js";
import { useState } from "react";

export default function Gamescreen({ img }) {
  const [characterPickerVisibility, setCharacterPickerVisibility] =
    useState(false);

  const [characterPickerXPos, setCharacterPickerXPos] = useState(0);

  const [characterPickerYPos, setCharacterPickerYPos] = useState(0);

  function onClick(event) {
    debugger;
    setCharacterPickerVisibility((prev) => !prev);
    setCharacterPickerXPos(event.screenX);
    setCharacterPickerYPos(event.screenY);
  }

  return (
    <div className="gamescreen" data-testid="gamescreen" onClick={onClick}>
      <CharacterPicker
        isVisible={characterPickerVisibility}
        location={{ x: characterPickerXPos, y: characterPickerYPos }}
      />
      <img className="gamescreen__map" src={img} />
    </div>
  );
}
