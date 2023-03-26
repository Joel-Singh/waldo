import mazeWaldo from "../assets/characters/maze/waldo.jpg";
import birdPerson from "../assets/characters/maze/bird_person.jpg";
import yellowHairPerson from "../assets/characters/maze/yellowed_hair_person.jpg";

import beachWaldo from "../assets/characters/beach/waldo.jpg";
import shovelBoy from "../assets/characters/beach/shovel_boy.jpg";
import dog from "../assets/characters/beach/dog.jpg";

import snowWaldo from "../assets/characters/snow/waldo.jpg";
import ouch from "../assets/characters/snow/ouch.jpg";
import monster from "../assets/characters/snow/monster.jpg";

export const characterInformation = {
  beach: [
    {
      databaseName: "beachWaldo",
      image: beachWaldo,
      displayName: "Waldo",
      coords: { x: 1286, y: 1637 },
    },
    {
      databaseName: "shovelBoy",
      image: shovelBoy,
      displayName: "Shovel Boy",
      coords: { x: 2725, y: 1090 },
    },
    {
      databaseName: "dog",
      image: dog,
      displayName: "Dog",
      coords: { x: 2153, y: 576 },
    },
  ],

  maze: [
    {
      databaseName: "mazeWaldo",
      image: mazeWaldo,
      displayName: "Waldo",
      coords: { x: 1377, y: 653 },
    },
    {
      databaseName: "birdPerson",
      image: birdPerson,
      displayName: "Bird Person",
      coords: { x: 1435, y: 687 },
    },
    {
      databaseName: "yellowHairPerson",
      image: yellowHairPerson,
      displayName: "Yellow Hair Person",
      coords: { x: 1929, y: 209 },
    },
  ],

  snow: [
    {
      databaseName: "snowWaldo",
      image: snowWaldo,
      displayName: "Waldo",
      coords: { x: 2561, y: 1419 },
    },
    {
      databaseName: "ouch",
      image: ouch,
      displayName: "Ouch!",
      coords: { x: 2313, y: 1087 },
    },
    {
      databaseName: "monster",
      image: monster,
      displayName: "Monster",
      coords: { x: 2798, y: 224 },
    },
  ],
};

export const flattenedCharacterInformation = (() => {
  const flattenedCharacterInformation = [];
  for (const map in characterInformation) {
    characterInformation[map].forEach((characterInfo) => {
      flattenedCharacterInformation.push(cloneObj(characterInfo));
    });
  }

  function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  return flattenedCharacterInformation;
})();

export const CHOOSING_CHARACTER_TOLERANCE = 40;
export const decisecondToMs = 100;

export function exposeCharacterToleranceAsCssVariable() {
  const root = document.documentElement;
  root.style.setProperty(
    "--choosing-character-tolerance",
    CHOOSING_CHARACTER_TOLERANCE
  );
}
