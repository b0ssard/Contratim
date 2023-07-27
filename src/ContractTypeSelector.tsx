// ContractTypeSelector.tsx
import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface ContractTypeSelectorProps {
  onSelect: (contractType: string) => void;
}

const ContractTypeSelector: React.FC<ContractTypeSelectorProps> = ({
  onSelect,
}) => {
  const [selectedContractType, setSelectedContractType] = useState<string>("");

  const handleContractTypeSelect = (contractType: string) => {
    setSelectedContractType(contractType);
    onSelect(contractType);
  };

  return (
    <ButtonGroup>
      <Button
        variant={selectedContractType === "ALUGUEL" ? "solid" : "outline"}
        onClick={() => handleContractTypeSelect("ALUGUEL")}
      >
        Aluguel
      </Button>
      <Button
        variant={selectedContractType === "EMPREITADA" ? "solid" : "outline"}
        onClick={() => handleContractTypeSelect("EMPREITADA")}
      >
        Empreitada
      </Button>
      <Button
        variant={
          selectedContractType === "COMPRA E VENDA" ? "solid" : "outline"
        }
        onClick={() => handleContractTypeSelect("COMPRA E VENDA")}
      >
        Compra e Venda
      </Button>
    </ButtonGroup>
  );
};

export default ContractTypeSelector;
