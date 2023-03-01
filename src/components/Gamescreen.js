import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import PropTypes from "prop-types";
import { useState } from "react";
import getPageXandGetPageY from "../util/getPageXandGetPageY.js"
import getFirebaseFunctions from "../util/firebase.js";

export default function Gamescreen(props) {
  const { img, characters: initialCharactersState = [] } = props;
  const [characterPickerInfo, setCharacterPickerInfo] = useState({
    visibility: false,
    xPos: 0,
    yPos: 0,
  });

  const [characters, setCharacters] = useState(
    initialCharactersState.map((char) => ({ ...char, isFound: false }))
  );

  return (
    <div
      className="gamescreen"
      data-testid="gamescreen"
      onClick={updateCharPickerInfo}
    >
      <img className="gamescreen__map" src={img} alt={"Map"} />

      <CharactersOverlay
        characters={characters.map(({ img, isFound, displayName }) => ({
          img,
          isFound,
          displayName,
        }))}
      />

      <CharacterPicker
        isVisible={characterPickerInfo.visibility}
        location={{ x: characterPickerInfo.xPos, y: characterPickerInfo.yPos }}
        characterInformation={characters.map(({ displayName, databaseName, isFound }) => ({
          displayName,
          databaseName,
          isFound
        }))}
        onCharacterClickFunc={updateCharacterIsFound}
      />
    </div>
  );

  function updateCharPickerInfo(event) {
    const {pageX, pageY} = getPageXandGetPageY(event)

    setCharacterPickerInfo(({ visibility }) => ({
      visibility: !visibility,
      xPos: pageX,
      yPos: pageY,
    }));
  }

  async function updateCharacterIsFound(databaseName, pos) {
    const { isCharacterAtPosition } = getFirebaseFunctions();
    const POSITION_TOLERANCE = 80;
    const isAtPosition = await isCharacterAtPosition(databaseName, pos, POSITION_TOLERANCE);

    setCharacters((characters) => {
      return characters.map((character) => {
        if (character.databaseName === databaseName && isAtPosition)
          return { ...character, isFound: true };
        else return { ...character };
      });
    });
  }
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
