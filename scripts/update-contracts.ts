import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "dotenv/config";

// npx ts-node --esm ./scripts/update-contracts.ts

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_CONFIG,
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

initializeApp(firebaseConfig);

const run = async () => {
  console.log("rodando...");
  const snapshot = await getDocs(collection(getFirestore(), "contracts"));
  console.log("Total contratos:", snapshot.size);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(-1);
  });
