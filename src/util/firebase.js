import {
  getDatabase,
  ref,
  get,
  set,
  connectDatabaseEmulator,
} from "firebase/database";
import { distance } from "mathjs";
import { initializeApp, getApps } from "firebase/app";
import { characterCoords } from "./constants";

let db;
export default function getFirebaseFunctions() {
  if (getApps().length === 0) initializeFirebase();

  return {
    clearDatabase,
    addCharacterCoordsToDatabase,
    isCharacterAtPosition,
    clearCharacterCoordsInDatabase
  };

  function clearDatabase() {
    return set(ref(db), null);
  }

  async function clearCharacterCoordsInDatabase() {
    await set(ref(db, `characterCoordinates/`), null)
  }

  //TODO: Final app won't have this function
  //The character coords will already be in the database
  function addCharacterCoordsToDatabase() {
    return Promise.all(
      characterCoords.map(({ name, coords }) =>
        addSingleCharacterCoordToDatabase(name, coords)
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
