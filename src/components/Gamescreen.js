import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import PropTypes from "prop-types";
import { useState } from "react";
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
        characterNames={characters.map(({ displayName, databaseName }) => ({
          displayName,
          databaseName,
        }))}
        onCharacterClickFunc={updateCharacterIsFound}
      />
    </div>
  );

  function updateCharPickerInfo(event) {
    const {pageX, pageY} = getPageXandGetPageY()

    setCharacterPickerInfo(({ visibility }) => ({
      visibility: !visibility,
      xPos: pageX,
      yPos: pageY,
    }));

    function getPageXandGetPageY() {
      function inJestTest() {
        return process.env.JEST_WORKER_ID !== undefined
      }
      let pageX;
      let pageY;
      // Necessary because testing doesn't support pageX and pageY
      if (inJestTest()) {
        pageX = event.screenX
        pageY = event.screenY
      } else {
        pageX = event.pageX
        pageY = event.pageY
      }

      return { pageX, pageY }
    }
  }

  async function updateCharacterIsFound(databaseName, pos) {
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
