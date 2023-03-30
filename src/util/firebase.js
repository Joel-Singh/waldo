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

  async function getAllDataFromDatabase() {
    const allData = (await get(ref(db))).val()
    if (allData === null) {
      return {}
    }
    return (await get(ref(db))).val()
  }

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
    let highscores = await getHighscoresFromDatabase()
    const sortedHighscores = Object.entries(highscores).sort(
      (x, y) => x[1] - y[1]
    );

    const sortedTopTen = sortedHighscores.slice(0, 10);
    let sortedTopTenAsObjects = sortedTopTen.map((highscore) => ({
      initials: highscore[0],
      timeTaken: highscore[1],
    }));

    sortedTopTenAsObjects = fillRestOfTenWithDummyScores(sortedTopTenAsObjects)

    return sortedTopTenAsObjects;

    function fillRestOfTenWithDummyScores(sortedTopTenAsObjects) {
      if (sortedTopTenAsObjects.length < 10) {
        const originalLength = sortedTopTenAsObjects.length
        sortedTopTenAsObjects.length = 10
        sortedTopTenAsObjects.fill({initials: "N/A", timeTaken: 999}, originalLength, 10);
      }
      return sortedTopTenAsObjects;
    }

    async function getHighscoresFromDatabase() {
      const allData = await getAllDataFromDatabase()

      try {
        return allData.highscores[`${map}`];
      } catch (error) {
        if (!(error instanceof TypeError))
          throw error

        return []
      }
    }
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
      const { characterCoordinates } = await getAllDataFromDatabase();
      return characterCoordinates[`${name}`];
    }
  }

  async function getCharCoordsInDb() {
    const dataSnapshot = await getAllDataFromDatabase();
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
