import { collection, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "dotenv/config";
import contractsData from "./contracts-data.json" assert { type: "json" };

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_CONFIG,
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

// npx ts-node --esm ./scripts/update-contracts.ts

initializeApp(firebaseConfig);

const db = getFirestore();

const run = async () => {
  console.log("rodando...");

  for (const contract of contractsData.contracts) {
    const docRef = await addDoc(collection(db, "contracts"), contract);
    console.log("Contract added with ID: ", docRef.id);
  }

  console.log("Upload completed!");
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(-1);
  });
