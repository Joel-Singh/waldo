import {
  getDatabase,
  ref,
  get,
  set,
  connectDatabaseEmulator,
} from "firebase/database";
import { distance } from "mathjs";
import { initializeApp, getApps } from "firebase/app";
import { flattenedCharacterInformation } from "./constants";

let db;
export default function getFirebaseFunctions() {
  if (getApps().length === 0) initializeFirebase();

  return {
    clearDatabase,
    clearHighscores,
    addFakeCharacterCoordsToDatabase: () => addCharacterCoordsToDatabase(true),
    addRealCharacterCoordsToDatabase: () => addCharacterCoordsToDatabase(false),
    addHighscore,
    getTopTenHighscores,
    isCharacterAtPosition,
    clearCharacterCoordsInDatabase,
    getCharCoordsInDb,
  };

  function clearDatabase() {
    return set(ref(db), null);
  }

  async function clearCharacterCoordsInDatabase() {
    await set(ref(db, `characterCoordinates/`), null);
  }

  async function clearHighscores() {
    await set(ref(db, `highscores/`), null);
  }

  async function addHighscore(map, initials, scoreAsSecondsElapsed) {
    await set(
      ref(db, `highscores/${map}/${initials}`),
      scoreAsSecondsElapsed
    ).catch(() => console.error("Couldn't add highscore"));
  }

  async function getTopTenHighscores(map) {
    const highscores = (await get(ref(db))).val().highscores[`${map}`];

    const sortedHighscores = Object.entries(highscores).sort(
      (x, y) => x[1] - y[1]
    );

    const sortedTopTen = sortedHighscores.slice(0, 10);
    const sortedTopTenAsObjects = sortedTopTen.map((highscore) => ({
      initials: highscore[0],
      timeTaken: highscore[1],
    }));

    return sortedTopTenAsObjects;
  }

  //TODO: Final app won't have this function
  //The character coords will already be in the database
  function addCharacterCoordsToDatabase(useDummyCoords) {
    const mapActualCoords = ({ databaseName, coords }) =>
      addSingleCharacterCoordToDatabase(databaseName, coords);

    const mapFakeCoords = ({ databaseName }) =>
      addSingleCharacterCoordToDatabase(databaseName, { x: 0, y: 0 });

    return Promise.all(
      flattenedCharacterInformation.map(
        useDummyCoords ? mapFakeCoords : mapActualCoords
      )
    );

    async function addSingleCharacterCoordToDatabase(name, coords) {
      await set(ref(db, `characterCoordinates/${name}`), coords).catch(() =>
        console.error("Couldn't add single character coordinate")
      );
    }
  }

  async function isCharacterAtPosition(name, pos, withinDistance = 0) {
    const dbPos = await getCharPosInDb(name);

    return distance([pos.x, pos.y], [dbPos.x, dbPos.y]) <= withinDistance;

    async function getCharPosInDb(name) {
      const { characterCoordinates } = (await get(ref(db))).val();
      return characterCoordinates[`${name}`];
    }
  }

  async function getCharCoordsInDb() {
    const dataSnapshot = (await get(ref(db))).val();
    if (
      dataSnapshot === null ||
      !dataSnapshot.hasOwnProperty("characterCoordinates")
    )
      throw new Error("Character coords never initialized in database");

    return dataSnapshot.characterCoordinates;
  }
}

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBi3Vk9CTvjIUA3SzS94tlSpxwVKd38qWM",
    authDomain: "waldo-a317d.firebaseapp.com",
    projectId: "waldo-a317d",
    storageBucket: "waldo-a317d.appspot.com",
    messagingSenderId: "356577803449",
    appId: "1:356577803449:web:9e7be0752c53b8aab42f68",
    databaseURL: "https://waldo-a317d-default-rtdb.firebaseio.com/",
  };

  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
}
