import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import Button from "./Button";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";
import contractData from "./contractData.json";

const Contracts: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState(
    contractData.contracts[0].contractType
  );

  const selectedContract = contractData.contracts.find(
    (contract) => contract.contractType === selectedContractType
  );

  const [fields, setFields] = useState(selectedContract?.inputFields || []);

  const handleContractTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedContractType = event.target.value;
    setSelectedContractType(newSelectedContractType);

    const newSelectedContract = contractData.contracts.find(
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
      <FormControl>
        <FormLabel htmlFor="contractType">Choose Contract Type:</FormLabel>
        <Select
          id="contractType"
          value={selectedContractType}
          onChange={handleContractTypeChange}
          size="md"
          variant="filled"
        >
          {contractData.contracts.map((contract) => (
            <option key={contract.contractType} value={contract.contractType}>
              {contract.contractType}
            </option>
          ))}
        </Select>
      </FormControl>

      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {selectedContract && (
        <ContractContent
          fields={fields}
          selectedContractType={selectedContractType}
        />
      )}

      <Button as={Link} to="/" mt={4} colorScheme="blue">
        Voltar
      </Button>
    </Box>
  );
};

export default Contracts;
