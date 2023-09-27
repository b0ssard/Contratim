import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";
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
// import { useNavigate } from "react-router-dom";

import { db } from "./firebase-config";

interface ContractData {
  contractType: string;
  status: string;
  id: string;
}

const MyContracts: React.FC = () => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  // const navigate = useNavigate();

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
        <List>
          {userContracts.map((contract, index) => (
            <ListItem key={index}>
              <strong>Tipo de Contrato:</strong> {contract.contractType}
              <br />
              <strong>Status:</strong> {contract.status}
              <br />
              <strong>ID do Contrato:</strong> {contract.id}{" "}
              <Button
                as={Link}
                to={`/ContractEdit`}
                // onClick={() => navigate(`/edit-contract/${contract.id}`)}
              >
                Editar Contrato
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyContracts;
