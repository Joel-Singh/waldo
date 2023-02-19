import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Gamescreen({ img, characters = [] }) {
  const [characterPickerVisibility, setCharacterPickerVisibility] =
    useState(false);
  const [characterPickerXPos, setCharacterPickerXPos] = useState(0);
  const [characterPickerYPos, setCharacterPickerYPos] = useState(0);

  function onClick({ screenX, screenY }) {
    setCharacterPickerVisibility((prev) => !prev);
    setCharacterPickerXPos(screenX);
    setCharacterPickerYPos(screenY);
  }

  return (
    <div className="gamescreen" data-testid="gamescreen" onClick={onClick}>
      <CharactersOverlay
        characters={characters.map((char) => ({ ...char, isFound: false }))}
      />
      <CharacterPicker
        isVisible={characterPickerVisibility}
        location={{ x: characterPickerXPos, y: characterPickerYPos }}
        characterNames={characters.map((character) => character.name)}
      />
      <img className="gamescreen__map" src={img} />
    </div>
  );
}

export function createCharacter(name, img) {
  return { name, img };
}

function cloneObjArr(obj) {
  return JSON.parse(JSON.stringify(obj));
}

Gamescreen.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
