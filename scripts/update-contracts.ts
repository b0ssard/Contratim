import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { contractsData } from "./contractsData";

const updateContracts = async () => {
  try {
    const snapshot = await getDocs(collection(getFirestore(), "contracts"));
    console.log("Total contratos:", snapshot.size);
    const ids = snapshot.docs.map((doc) => doc.id);
    console.log(ids);

    await contractsData.contracts.reduce(async (p, value) => {
      await p;
      if (!ids.includes(value.contractType)) {
        console.log(`${value.contractType} não está; adicionado...`);
        const contractRef = doc(getFirestore(), "contracts", value.contractType);
        await setDoc(contractRef, value);
      } else {
        console.log("pulando...");
      }
    }, Promise.resolve());
  } catch (error) {
    console.error(error);
  }
};

updateContracts();
