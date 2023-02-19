import MapPreview from "./components/MapPreview";
import Gamescreen, { createCharacter } from "./components/Gamescreen";

import mazeWaldo from "./assets/characters/maze/waldo.jpg";
import birdPerson from "./assets/characters/maze/bird_person.jpg";
import yellowHairPerson from "./assets/characters/maze/yellowed_hair_person.jpg";

import beachWaldo from "./assets/characters/beach/waldo.jpg";
import shovelBoy from "./assets/characters/beach/shovel_boy.jpg";
import dog from "./assets/characters/beach/dog.jpg";

import snowWaldo from "./assets/characters/snow/waldo.jpg";
import ouch from "./assets/characters/snow/ouch.jpg";
import monster from "./assets/characters/snow/monster.jpg";

import mazeMap from "./assets/maps/maze.jpg";
import beachMap from "./assets/maps/beach.jpg";
import snowMap from "./assets/maps/snow.jpg";

const getMapPreviews = () => ({
  mazeMapPreview: (
    <MapPreview
      mapName="Maze"
      mapImage={mazeMap}
      mapPath="maze"
      previewCharacterInformation={[
        {
          name: "Waldo",
          image: mazeWaldo,
        },
        {
          name: "Bird Person",
          image: birdPerson,
        },
        {
          name: "Yellow Hair Person",
          image: yellowHairPerson,
        },
      ]}
    />
  ),
  beachMapPreview: (
    <MapPreview
      mapName="Beach"
      mapImage={beachMap}
      mapPath="beach"
      previewCharacterInformation={[
        {
          name: "Waldo",
          image: beachWaldo,
        },
        {
          name: "Shovel Boy",
          image: shovelBoy,
        },
        {
          name: "Dog",
          image: dog,
        },
      ]}
    />
  ),
  snowMapPreview: (
    <MapPreview
      mapName="Snow"
      mapImage={snowMap}
      mapPath="snow"
      previewCharacterInformation={[
        {
          name: "Waldo",
          image: snowWaldo,
        },
        {
          name: "Ouch",
          image: ouch,
        },
        {
          name: "Monster",
          image: monster,
        },
      ]}
    />
  ),
});

const getGamescreens = () => ({
  maze: (
    <Gamescreen
      img={mazeMap}
      characters={[
        createCharacter("Waldo", mazeWaldo),
        createCharacter("Bird Person", birdPerson),
        createCharacter("Yellow Hair Person", yellowHairPerson)
      ]}
    />
  ),
  beach: (
    <Gamescreen
      img={beachMap}
      characters={[
        createCharacter("Waldo", beachWaldo),
        createCharacter("Shovel Boy", shovelBoy),
        createCharacter("Dog", dog)
      ]}
    />
  ),
  snow: (
    <Gamescreen
      img={snowMap}
      characters={[
        createCharacter("Waldo", snowWaldo),
        createCharacter("Ouch!", shovelBoy),
        createCharacter("Monster", dog)
      ]}
    />
  ),
});

export { getMapPreviews, getGamescreens };
