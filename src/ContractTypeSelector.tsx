import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

interface ContractTypeSelectorProps {
  selectedContractType: string;
  handleContractTypeChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  contracts: { contractType: string }[];
}

const ContractTypeSelector: React.FC<ContractTypeSelectorProps> = ({
  selectedContractType,
  handleContractTypeChange,
  contracts,
}) => {
  console.log("Contracts:", contracts);
  console.log("Selected Contract Type:", selectedContractType);

  return (
    <FormControl>
      <FormLabel htmlFor="contractType">Choose Contract Type:</FormLabel>
      <Select
        id="contractType"
        value={selectedContractType}
        onChange={handleContractTypeChange}
        size="md"
        variant="filled"
      >
        {contracts.map((contract, index) => {
          console.log("Mapping Contract:", contract);
          return (
            <option key={index} value={contract.contractType}>
              {contract.contractType}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};


export default ContractTypeSelector;
