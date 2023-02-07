import {
  getDatabase,
  ref,
  set,
  connectDatabaseEmulator,
} from "firebase/database";
import { initializeApp } from "firebase/app";

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
  connectDatabaseEmulator(db, "localhost", 9000);
}

export function testDatabaseSetting() {
  set(ref(db, "users/37"), {
    username: "Joel",
    email: "joelsingh788@gmail.com",
    profile_picture: "penisman",
  });
}

//TODO: Final app won't have this function
//The character coords will already be in the database
export function addCharacterCoordsToDatabase() {
  const characterCoords = [
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
      coords: { x: 1929, y: 209 }
    },
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
  ];

  characterCoords.forEach(({ name, coords }) => {
    addSingleCharacterCoordToDatabase(name, coords);
  });

  function addSingleCharacterCoordToDatabase(name, coords) {
    set(ref(db, `characterCoordinates/${name}`), coords).catch(() =>
      console.error("Couldn't add single character coordinate")
    );
  }
}
