import {
  getDatabase,
  ref,
  set,
  connectDatabaseEmulator,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { characterCoords } from "./constants";

let db;
export default function initializeFirebase() {
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

  function testDatabaseSetting() {
    set(ref(db, "users/37"), {
      username: "Joel",
      email: "joelsingh788@gmail.com",
      profile_picture: "penisman",
    });
  }

  function clearDatabase() {
    return set(ref(db), null);
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

  return { testDatabaseSetting, clearDatabase, addCharacterCoordsToDatabase };
}
