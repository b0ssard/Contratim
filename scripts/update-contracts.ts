import {
  collection,
  setDoc,
  getFirestore,
  Firestore,
  deleteDoc,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "firebase/app";
import "dotenv/config";
import contractsData from "./contracts-data.json" assert { type: "json" };

// npx ts-node --esm ./scripts/update-contracts.ts

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_CONFIG as string,
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const db: Firestore = getFirestore(app);

const run = async () => {
  console.log("rodando...");

  const contractsCollectionRef = collection(db, "contracts");
  const contractsQuery = query(contractsCollectionRef);
  const contractsSnapshot = await getDocs(contractsQuery);

  contractsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    console.log("Document deleted with ID: ", doc.id);
  });

  for (const contract of contractsData.contracts) {
    const { contractType } = contract; 

    const contractDocRef = doc(contractsCollectionRef, contractType);
    await setDoc(contractDocRef, contract);

    console.log("Contract added with ID: ", contractType);
  }

  console.log("Upload completed!");
};

run()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(-1);
  });
