import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface ContractData {
  contractType: string;
  status: string;
}

const MyContracts: React.FC = () => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
          const querySnapshot = await getDocs(q);
          const contractsData: ContractData[] = querySnapshot.docs.map(
            (doc) => {
              const data = doc.data();
              return {
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
    <div>
      <h2>Meus Contratos</h2>
      {userContracts.length === 0 ? (
        <p>Nenhum contrato encontrado para o usuário {userEmail}.</p>
      ) : (
        <ul>
          {userContracts.map((contract, index) => (
            <li key={index}>
              <strong>Tipo de Contrato:</strong> {contract.contractType}
              <br />
              <strong>Status:</strong> {contract.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyContracts;
