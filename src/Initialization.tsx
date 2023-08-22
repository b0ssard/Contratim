import React, { useEffect, useState } from "react";
import { addContractToFirestore } from "./Utils";
import { contractsData } from "./contractsData";

const Initialization = ({ children }: { children: React.ReactNode }) => {
  const [contractsAdded, setContractsAdded] = useState(false);

  useEffect(() => {
    if (!contractsAdded) {
      addContractToFirestore(contractsData.contracts[0])
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
