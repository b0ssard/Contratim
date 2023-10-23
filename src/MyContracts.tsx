import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Text, List, ListItem } from "@chakra-ui/react";
import Button from "./Button";
import {
  getDocs,
  collection,
  query,
  where,
  DocumentData,
  QuerySnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, Auth, User } from "firebase/auth";
import { db } from "./firebase-config";

interface ContractData {
  contractType: string;
  status: string;
  id: string;
  data: { [key: string]: string };
}

const MyContracts: React.FC = () => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [editedContract, setEditedContract] = useState<ContractData | null>(
    null
  );

  const clearInputData = () => {
    const inputs = document.querySelectorAll(
      "input[type='text']"
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const setSelectedContractWithClear = (contract: ContractData | null) => {
    clearInputData();
    setEditedContract(contract);
  };

  const handleInputChange = (key: string, value: string) => {
    if (editedContract) {
      const updatedContract = { ...editedContract };
      updatedContract.data[key] = value;
      setEditedContract(updatedContract);
    }
  };

  const handleDeleteContract = async (contractId: string) => {
    try {
      const docRef = doc(db, "filledContracts", contractId);
      await deleteDoc(docRef);
      const updatedContracts = userContracts.filter(
        (contract) => contract.id !== contractId
      );
      setUserContracts(updatedContracts);
      console.log("Contrato excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir contrato: ", error);
    }
  };

  const updateContract = async () => {
    if (editedContract) {
      try {
        const docRef = doc(db, "filledContracts", editedContract.id);
        await updateDoc(docRef, { data: editedContract.data });
        console.log("Dados atualizados com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar dados: ", error);
      }
    }
  };

  useEffect(() => {
    const auth: Auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setLoading(false);
        setError("Você não está logado.");
        return;
      }
      setUserEmail(user.email);

      try {
        const filledContractsCollection = collection(db, "filledContracts");
        const q = query(
          filledContractsCollection,
          where("userEmail", "==", user.email)
        );
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
        const contractsData: ContractData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            contractType: data.contractType,
            status: data.status,
            data: data.data,
          };
        });

        setUserContracts(contractsData);
        setLoading(false);
      } catch (error) {
        setError(
          "Erro ao buscar contratos do usuário: " + (error as Error).message
        );
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderContractDetails = () => {
    if (!editedContract) return null;

    return (
      <div>
        <Heading fontSize={["2xl"]} mt={5}>
          Detalhes do Contrato Selecionado
        </Heading>
        <Text>
          <strong>Tipo de Contrato:</strong> {editedContract.contractType}
          <br />
          <strong>Status:</strong> {editedContract.status}
          <br />
          <strong>ID do Contrato:</strong> {editedContract.id}
          <br />
          <strong>Detalhes:</strong>
          <br />
          {Object.entries(editedContract.data).map(([key, value]) => (
            <React.Fragment key={key}>
              <strong>{key}:</strong>{" "}
              <Input
                placeholder={value.trim() === "" ? "Não preenchido" : ""}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: "blue.500" }}
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
              <br />
            </React.Fragment>
          ))}
          <Button onClick={updateContract}>Atualizar</Button>
        </Text>
      </div>
    );
  };

  if (loading) {
    return <div>Carregando contratos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box p={4} textAlign="justify">
      <Heading fontSize={["3xl"]} mb={7} textAlign="center">
        Meus Contratos
      </Heading>
      {userContracts.length === 0 ? (
        <Text>Nenhum contrato encontrado para o usuário {userEmail}.</Text>
      ) : (
        <div>
          <List>
            {userContracts.map((contract, index) => (
              <ListItem key={index}>
                <strong>Tipo de Contrato:</strong> {contract.contractType}
                <br />
                <strong>Status:</strong> {contract.status}
                <br />
                <strong>ID do Contrato:</strong> {contract.id}{" "}
                <Button onClick={() => setSelectedContractWithClear(contract)}>
                  Ver Detalhes
                </Button>
                <Button onClick={() => handleDeleteContract(contract.id)}>
                  Deletar
                </Button>
              </ListItem>
            ))}
          </List>
          {renderContractDetails()}
        </div>
      )}
    </Box>
  );
};

export default MyContracts;
