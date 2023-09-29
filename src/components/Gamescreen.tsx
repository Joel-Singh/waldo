import { useEffect, useState } from "react";
// @ts-ignore
import PropTypes from "prop-types";

import CharacterPicker from "./CharacterPicker.js";
import CharactersOverlay from "./CharactersOverlay.js";
import CursorOverlay from "./CursorOverlay.js";
import Stopwatch from "./Stopwatch.js";

import getPageXandGetPageY from "../util/getPageXandGetPageY.js";
import { isCharacterAtPosition } from "../util/firebase";
import { CHOOSING_CHARACTER_TOLERANCE } from "../util/constants";

import "../styles/gamescreen.css";

export default function Gamescreen(props) {
  const {
    img,
    characters: initialCharactersState = [],
    onAllCharactersFound = () => {},
  } = props;

  const [characterPickerInfo, setCharacterPickerInfo] = useState({
    visibility: false,
    xPos: 0,
    yPos: 0,
  });

  const [characters, setCharacters] = useState(
    initialCharactersState.map((char) => ({ ...char, isFound: false }))
  );

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const allCharactersFound = characters.every(({ isFound }) => isFound);
    if (allCharactersFound) onAllCharactersFound(secondsElapsed);
  }, [characters]);

  return (
    <div
      className="gamescreen"
      data-testid="Gamescreen"
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

      {instantiateCharacterPicker()}

      <CursorOverlay isVisible={!characterPickerInfo.visibility} />

      <Stopwatch
        secondsElapsed={secondsElapsed}
        incrementDecisecond={() => setSecondsElapsed((prev) => prev + 0.1)}
      />
    </div>
  );

  function instantiateCharacterPicker() {
    return (
      <CharacterPicker
        isVisible={characterPickerInfo.visibility}
        location={{ x: characterPickerInfo.xPos, y: characterPickerInfo.yPos }}
        characterInformation={characters.map(
          ({ displayName, uniqueIdentifier, isFound }) => ({
            displayName,
            uniqueIdentifier,
            isFound,
          })
        )}
        onCharacterClickFunc={updateCharacterIsFound}
      />
    );

    async function updateCharacterIsFound(uniqueIdentifier, pos) {
      const isAtPosition = await isCharacterAtPosition(
        uniqueIdentifier,
        pos,
        CHOOSING_CHARACTER_TOLERANCE
      );

      setCharacters((characters) => {
        return characters.map((character) => {
          if (character.uniqueIdentifier === uniqueIdentifier && isAtPosition)
            return { ...character, isFound: true };
          else return { ...character };
        });
      });
    }
  }

  function updateCharPickerInfo(event) {
    const { pageX, pageY } = getPageXandGetPageY(event);

    setCharacterPickerInfo(({ visibility }) => ({
      visibility: !visibility,
      xPos: pageX,
      yPos: pageY,
    }));
  }
}

Gamescreen.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      uniqueIdentifier: PropTypes.string.isRequired,
    })
  ),
};
