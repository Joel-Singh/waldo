import MapPreview from "../components/MapPreview";
import Gamescreen from "../components/Gamescreen";
import createCharacter from "./createCharacter";

import mazeMap from "../assets/maps/maze.jpg";
import beachMap from "../assets/maps/beach.jpg";
import snowMap from "../assets/maps/snow.jpg";
import { characterInformation } from "./constants";

const getMapPreviews = () => ({
  mazeMapPreview: (
    <MapPreview
      mapName="Maze"
      mapImage={mazeMap}
      mapPath="maze"
      previewCharacterInformation={parsePreviewCharInfoFromCharInfo("maze")}
    />
  ),
  beachMapPreview: (
    <MapPreview
      mapName="Beach"
      mapImage={beachMap}
      mapPath="beach"
      previewCharacterInformation={parsePreviewCharInfoFromCharInfo("beach")}
    />
  ),
  snowMapPreview: (
    <MapPreview
      mapName="Snow"
      mapImage={snowMap}
      mapPath="snow"
      previewCharacterInformation={parsePreviewCharInfoFromCharInfo("snow")}
    />
  ),
});

function parsePreviewCharInfoFromCharInfo(map) {
  return characterInformation[map].map(({ displayName, image }) => ({
    name: displayName,
    image,
  }));
}

const getGamescreens = (onAllCharactersFound) => ({
  maze: (
    <Gamescreen
      img={mazeMap}
      onAllCharactersFound={onAllCharactersFound}
      characters={parseGamescreenCharactersFromCharInfo('maze')}
    />
  ),
  beach: (
    <Gamescreen
      img={beachMap}
      onAllCharactersFound={onAllCharactersFound}
      characters={parseGamescreenCharactersFromCharInfo('beach')}
    />
  ),
  snow: (
    <Gamescreen
      img={snowMap}
      onAllCharactersFound={onAllCharactersFound}
      characters={parseGamescreenCharactersFromCharInfo('snow')}
    />
  ),
});

function parseGamescreenCharactersFromCharInfo(map) {
  return characterInformation[map].map(({ displayName, databaseName, image }) =>
    createCharacter(displayName, databaseName, image)
  );
}

export { getMapPreviews, getGamescreens };
