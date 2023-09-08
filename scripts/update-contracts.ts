import {
  collection,
  setDoc,
  getFirestore,
  Firestore,
  deleteDoc,
  query,
  getDocs,
  doc,
  DocumentData,
} from "firebase/firestore";
import { initializeApp, FirebaseApp } from "firebase/app";
import "dotenv/config";
import contractsData from "./contracts-data.json" assert { type: "json" };

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_CONFIG as string,
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

// npx ts-node --esm ./scripts/update-contracts.ts

async function main() {
  try {
    console.log("rodando...");

    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    const contractsCollectionRef = collection(db, "contracts");

    const contractsQuery = query(contractsCollectionRef);
    const contractsSnapshot = await getDocs(contractsQuery);
    const deletePromises: Promise<void>[] = [];

    contractsSnapshot.forEach((contractDoc) => {
      deletePromises.push(deleteDoc(contractDoc.ref));
    });

    await Promise.all(deletePromises);
    console.log(
      "Document deleted with ID: ",
      contractsSnapshot.docs.map((doc) => doc.id).join(", ")
    );

    const addPromises: Promise<void>[] = [];

    for (const contract of contractsData.contracts) {
      const { contractType } = contract;
      const contractDocRef = doc(contractsCollectionRef, contractType);
      addPromises.push(setDoc(contractDocRef, contract as DocumentData));
    }

    await Promise.all(addPromises);
    console.log(
      "Contract added with ID: ",
      contractsData.contracts
        .map((contract) => contract.contractType)
        .join(", ")
    );

    console.log("Upload completed!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}

main();
