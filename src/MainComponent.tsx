// MainComponent.tsx
import React, { useState } from "react";
import AluguelContract from "./AluguelContract";
import EmpreitadaContract from "./EmpreitadaContract";
import CompraVendaContract from "./CompraEVendaContract";
import ContractTypeSelector from "./ContractTypeSelector";

const MainComponent: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState<string>("");

  const handleContractTypeSelect = (contractType: string) => {
    setSelectedContractType(contractType);
  };

  return (
    <div>
      <ContractTypeSelector onSelect={handleContractTypeSelect} />
      {selectedContractType === "ALUGUEL" && <AluguelContract />}
      {selectedContractType === "EMPREITADA" && <EmpreitadaContract />}
      {selectedContractType === "COMPRA E VENDA" && <CompraVendaContract />}
    </div>
  );
};

export default MainComponent;
