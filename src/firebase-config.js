import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfZvKfpp8ESiZX7KbYENqafIfiVdxbLm4",
  authDomain: "video-ui-b02ae.firebaseapp.com",
  projectId: "video-ui-b02ae",
  storageBucket: "video-ui-b02ae.appspot.com",
  messagingSenderId: "893151521918",
  appId: "1:893151521918:web:64ef7b16e2314b6f61bc2f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
