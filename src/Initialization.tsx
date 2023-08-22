import React, { useEffect, useState } from "react";
import { addContractToFirestore } from "./Utils";
import { contractsData } from "./contractsData";

const Initialization = ({ children }: { children: React.ReactNode }) => {
  const [contractsAdded, setContractsAdded] = useState(false);

  useEffect(() => {
    if (!contractsAdded) {
      // Adicione os contratos ao Firestore apenas se ainda não tiverem sido adicionados
      addContractToFirestore(contractsData.contracts[0]) // Por exemplo, aqui estamos adicionando o primeiro contrato da lista
        .then(() => {
          setContractsAdded(true);
        })
        .catch((error) => {
          console.error("Erro ao adicionar contratos:", error);
        });
    }
  }, [contractsAdded]);

  return <>{children}</>;
};

export default Initialization;
