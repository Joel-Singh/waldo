export const characterInformation = {
  beach: [
    {
      databaseName: "beachWaldo",
      displayName: "Waldo",
      coords: { x: 1286, y: 1637 },
    },
    {
      databaseName: "shovelBoy",
      displayName: "Shovel Boy",
      coords: { x: 2725, y: 1090 },
    },
    {
      databaseName: "dog",
      displayName: "Dog",
      coords: { x: 2153, y: 576 },
    },
  ],

  maze: [
    {
      databaseName: "mazeWaldo",
      displayName: "Waldo",
      coords: { x: 1377, y: 653 },
    },
    {
      databaseName: "birdPerson",
      displayName: "Bird Person",
      coords: { x: 1435, y: 687 },
    },
    {
      databaseName: "yellowHairPerson",
      displayName: "Yellow Hair Person",
      coords: { x: 1929, y: 209 },
    },
  ],

  snow: [
    {
      databaseName: "snowWaldo",
      displayName: "Waldo",
      coords: { x: 2561, y: 1419 },
    },
    {
      databaseName: "ouch",
      displayName: "Ouch!",
      coords: { x: 2313, y: 1087 },
    },
    {
      databaseName: "monster",
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
