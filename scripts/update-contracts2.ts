import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { initializeApp, FirebaseApp } from "firebase/app";
import contractsData from "./contracts-data2.json" assert { type: "json" };

// npx ts-node --esm ./scripts/update-contracts2.ts

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_CONFIG as string,
  authDomain: "contratim-live.firebaseapp.com",
  projectId: "contratim-live",
  storageBucket: "contratim-live.appspot.com",
  messagingSenderId: "406867580378",
  appId: "1:406867580378:web:edc1c90a937bf0cc125ce3",
  measurementId: "G-TRQWE8CY5C",
};

async function main() {
  try {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    const db: Firestore = getFirestore(app);
    // Modifique a referência da coleção para "contracts2"
    const contractsCollectionRef = collection(db, "contracts2");
    const contractsQuery = query(contractsCollectionRef);
    const contractsSnapshot = await getDocs(contractsQuery);
    const deletePromises: Promise<void>[] = [];

    console.log("Rodando...");

    contractsSnapshot.forEach((contractDoc) => {
      deletePromises.push(deleteDoc(contractDoc.ref));
    });

    await Promise.all(deletePromises);
    console.log(
      "Documentos excluídos com IDs:",
      contractsSnapshot.docs.map((doc) => doc.id).join(", ")
    );

    const addPromises: Promise<void>[] = [];

    for (const contract2 of contractsData.contracts2) {
      const { contractType } = contract2;
      const contractDocRef = doc(contractsCollectionRef, contractType);
      addPromises.push(setDoc(contractDocRef, contract2 as DocumentData));
    }

    await Promise.all(addPromises);
    console.log(
      "Contratos adicionados com IDs:",
      contractsData.contracts2
        .map((contract) => contract.contractType)
        .join(", ")
    );

    console.log("Upload concluído!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}

main();
