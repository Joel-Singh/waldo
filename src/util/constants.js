export const characterCoords = {
  beach: [
    {
      name: "beachWaldo",
      coords: { x: 1286, y: 1637 },
    },
    {
      name: "shovelBoy",
      coords: { x: 2725, y: 1090 },
    },
    {
      name: "dog",
      coords: { x: 2153, y: 576 },
    },
  ],

  maze: [
    {
      name: "mazeWaldo",
      coords: { x: 1377, y: 653 },
    },
    {
      name: "birdPerson",
      coords: { x: 1435, y: 687 },
    },
    {
      name: "yellowHairPerson",
      coords: { x: 1929, y: 209 },
    },
  ],

  snow: [
    {
      name: "snowWaldo",
      coords: { x: 2561, y: 1419 },
    },
    {
      name: "ouch",
      coords: { x: 2313, y: 1087 },
    },
    {
      name: "monster",
      coords: { x: 2798, y: 224 },
    },
  ],
};

export const flattenedCharacterCoords = (() => {
  const flattenedCharacterCoords = [];
  for (const map in characterCoords) {
    characterCoords[map].forEach((characterCoords) => {
      flattenedCharacterCoords.push(characterCoords);
    });
  }
  return flattenedCharacterCoords;
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
