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
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, Auth, User } from "firebase/auth";
import { db } from "./firebase-config";

interface ContractData {
  contractType: string;
  status: string;
  id: string;
  data: string;
}

const MyContracts: React.FC = () => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(
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
    setSelectedContract(contract);
  };

  useEffect(() => {
    const auth: Auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        setLoading(false);
        setError("Você não está logado.");
        return;
      }

      setUserEmail(user.email);

      const fetchUserContracts = async () => {
        try {
          const filledContractsCollection = collection(db, "filledContracts");
          const q = query(
            filledContractsCollection,
            where("userEmail", "==", user.email)
          );
          const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
          const contractsData: ContractData[] = querySnapshot.docs.map(
            (doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                contractType: data.contractType,
                status: data.status,
                data: data.data,
              };
            }
          );

          setUserContracts(contractsData);
          setLoading(false);
        } catch (error) {
          setError(
            "Erro ao buscar contratos do usuário: " + (error as Error).message
          );
          setLoading(false);
        }
      };

      fetchUserContracts();
    });

    return () => unsubscribe();
  }, []);

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
              </ListItem>
            ))}
          </List>

          {selectedContract && (
            <div>
              <Heading fontSize={["2xl"]} mt={5}>
                Detalhes do Contrato Selecionado
              </Heading>
              <Text>
                <strong>Tipo de Contrato:</strong>{" "}
                {selectedContract.contractType}
                <br />
                <strong>Status:</strong> {selectedContract.status}
                <br />
                <strong>ID do Contrato:</strong> {selectedContract.id}
                <br />
                <strong>Detalhes:</strong>
                <br />
                {Object.entries(selectedContract.data).map(([key, value]) => (
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
                    />
                    <br />
                  </React.Fragment>
                ))}
              </Text>
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default MyContracts;
