import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "",
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
