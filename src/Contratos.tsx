import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import "./Contratos.scss";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";
import contractInputs from "./contractInputs.json";

const Contratos: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState(
    contractInputs.contracts[0].contractType
  );

  const selectedContract = contractInputs.contracts.find(
    (contract) => contract.contractType === selectedContractType
  );

  const [fields, setFields] = useState(selectedContract?.inputFields || []);

  const handleContractTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedContractType(event.target.value);
    const newSelectedContract = contractInputs.contracts.find(
      (contract) => contract.contractType === event.target.value
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
    <Box className="custom-container">
      <div>
        <label htmlFor="contractType">Choose Contract Type: </label>
        <select
          id="contractType"
          value={selectedContractType}
          onChange={handleContractTypeChange}
        >
          {contractInputs.contracts.map((contract) => (
            <option key={contract.contractType} value={contract.contractType}>
              {contract.contractType}
            </option>
          ))}
        </select>
      </div>

      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {selectedContractType === "rental" && (
        <React.Fragment>
          <ContractContent fields={fields} />
        </React.Fragment>
      )}

      <Button as={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
};

export default Contratos;
