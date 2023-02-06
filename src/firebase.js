import { getDatabase, ref, set, connectDatabaseEmulator } from "firebase/database";
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
  set(ref(db, 'users/37'), {
    username: 'Joel',
    email: 'joelsingh788@gmail.com',
    profile_picture: 'penisman',
  })
}

//TODO: Final app won't have this function
//The character coords will already be in the database
export function addCharacterCoordsToDatabase() {
  const characterCoords = [
    {
      name: "name1",
      coords: {x: 28, y: 10}
    },
    {
      name: "name2",
      coords: {x: 86, y: 30}
    },
    {
      name: "name3",
      coords: {x: 21, y: 90}
    },
  ]

  characterCoords.forEach(({name, coords}) => {
    addSingleCharacterCoordToDatabase(name, coords)
  })

  function addSingleCharacterCoordToDatabase(name, coords) {
    set(ref(db, `characterCoordinates/${name}`), coords)
      .catch(() => console.error("Couldn't add single character coordinate"))
  }
}
