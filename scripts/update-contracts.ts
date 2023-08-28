import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { contractsData } from "./contractsData";

const updateContracts = async () => {
  const firestore = getFirestore();
  const contractsCollection = collection(firestore, "contracts");

  try {
    const snapshot = await getDocs(contractsCollection);
    const existingContractIds = snapshot.docs.map((doc) => doc.id);

    console.log("Total de contratos:", snapshot.size);
    console.log("IDs de contratos existentes:", existingContractIds);

    await Promise.all(
      contractsData.contracts.map(async (contract) => {
        if (!existingContractIds.includes(contract.contractType)) {
          console.log(`${contract.contractType} não está adicionado...`);
          const contractRef = doc(contractsCollection, contract.contractType);
          await setDoc(contractRef, contract);
        } else {
          console.log("Pulando...", contract.contractType);
        }
      })
    );

    console.log("Conclusão: Contratos atualizados com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar contratos:", error);
  }
};

updateContracts();
