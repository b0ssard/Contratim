import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importe as funções corretas do Firebase Auth

// ...
interface ContractData {
  contractType: string;
  header: string;
}

const MyContracts: React.FC = () => {
  const [userContracts, setUserContracts] = useState<ContractData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(); // Obtenha a instância de autenticação do Firebase

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Se o usuário não estiver logado, saia da função
        setLoading(false);
        setError("Você não está logado.");
        return;
      }

      const fetchUserContracts = async () => {
        try {
          const contractsCollection = collection(db, "contracts");
          const q = query(contractsCollection, where("userId", "==", user.uid)); // Use user.uid como ID do usuário
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
    });

    // Certifique-se de cancelar a inscrição quando o componente for desmontado
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
        <p>Nenhum contrato encontrado para o usuário.</p>
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
