import { db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

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

export const addContractToFirestore = async (
  contract: Contract
): Promise<void> => {
  try {
    const docRef = doc(db, "contracts", "contract1");
    await setDoc(docRef, contract);

    console.log("Contrato adicionado ao Firestore com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar contrato ao Firestore:", error);
    throw error;
  }
};
