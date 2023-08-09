import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";
import contractsData from "./contractsData.json";
import ContractTypeSelector from "./ContractTypeSelector";

const Contracts: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState(
    contractsData.contracts[0].contractType
  );

  const selectedContract = contractsData.contracts.find(
    (contract) => contract.contractType === selectedContractType
  );

  const [fields, setFields] = useState(selectedContract?.inputFields || []);

  const handleContractTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedContractType = event.target.value;
    setSelectedContractType(newSelectedContractType);

    const newSelectedContract = contractsData.contracts.find(
      (contract) => contract.contractType === newSelectedContractType
    );

    setFields(newSelectedContract?.inputFields || []);
  };

  const handleFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  return (
    <Box p={[2, 4, 6]} className="custom-container">
      <ContractTypeSelector
        selectedContractType={selectedContractType}
        handleContractTypeChange={handleContractTypeChange}
        contracts={contractsData.contracts}
      />

      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {selectedContract && (
        <ContractContent
          fields={fields}
          selectedContractType={selectedContractType}
        />
      )}

      <Button as={Link} to="/" mt={4}>
        Voltar
      </Button>
    </Box>
  );
};

export default Contracts;
