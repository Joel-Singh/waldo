import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import PropTypes from "prop-types";
import { useState } from "react";
import getFirebaseFunctions from "../firebase.js";

export default function Gamescreen({
  img,
  characters: initialCharactersState = [],
}) {
  const [characterPickerInfo, setCharacterPickerInfo] = useState({
    visibility: false,
    xPos: 0,
    yPos: 0,
  });

  const [characters, setCharacters] = useState(
    initialCharactersState.map((char) => ({ ...char, isFound: false }))
  );

  function onClick({ screenX, screenY }) {
    setCharacterPickerInfo(({ visibility }) => ({
      visibility: !visibility,
      xPos: screenX,
      yPos: screenY,
    }));
  }

  async function onCharacterClick(databaseName, pos) {
    const { isCharacterAtPosition } = getFirebaseFunctions();
    const isAtPosition = await isCharacterAtPosition(databaseName, pos, 30);

    setCharacters((characters) => {
      return characters.map((character) => {
        if (character.databaseName === databaseName && isAtPosition)
          return { ...character, isFound: true };
        else return { ...character };
      });
    });
  }

  return (
    <div className="gamescreen" data-testid="gamescreen" onClick={onClick}>
      <CharactersOverlay characters={characters} />
      <CharacterPicker
        isVisible={characterPickerInfo.visibility}
        location={{ x: characterPickerInfo.xPos, y: characterPickerInfo.yPos }}
        characterNames={characters.map(({ displayName, databaseName }) => ({
          displayName,
          databaseName,
        }))}
        onCharacterClickFunc={onCharacterClick}
      />
      <img className="gamescreen__map" src={img} />
    </div>
  );
}

export function createCharacter(displayName, databaseName, img) {
  return { displayName, databaseName, img };
}

Gamescreen.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      databaseName: PropTypes.string.isRequired,
    })
  ),
};
