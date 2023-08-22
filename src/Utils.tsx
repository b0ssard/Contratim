import { db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

// Tipo para um contrato
export interface Contract {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: InputField[];
}

export interface Section {
  title: string | null;
  content: string;
}

export interface InputField {
  label: string;
  value: string;
}



// Função para adicionar um contrato ao Firestore
export const addContractToFirestore = async (
  contract: Contract
): Promise<void> => {
  try {
    // Use o método set para adicionar um contrato com um ID personalizado
    const docRef = doc(db, "contracts", "contract1");
    await setDoc(docRef, contract);

    console.log("Contrato adicionado ao Firestore com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar contrato ao Firestore:", error);
    throw error;
  }
};
