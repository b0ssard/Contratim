import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

interface MyContractsProps {
  userId: string;
}

interface ContractData {
  contractType: string;
  header: string;
}

const MyContracts: React.FC<MyContractsProps> = ({ userId }) => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserContracts = async () => {
      try {
        const contractsCollection = collection(db, "contracts");
        const q = query(contractsCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const contractsData: ContractData[] = querySnapshot.docs.map(
          (doc) => doc.data() as ContractData
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
  }, [userId]);

  if (loading) {
    return <div>Carregando contratos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Meus Contratos</h2>
      {userContracts.length === 0 ? (
        <p>Nenhum contrato encontrado no ID: {userId}</p>
      ) : (
        <ul>
          {userContracts.map((contract, index) => (
            <li key={index}>
              <strong>Tipo de Contrato:</strong> {contract.contractType}
              <br />
              <strong>Cabeçalho:</strong> {contract.header}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyContracts;
