import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import "./Contratos.scss";
import ContractInputs from "./Inputs";
import contractData from "./contractData.json";

const Contratos: React.FC = () => {
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
    const newContractType = event.target.value;
    setSelectedContractType(newContractType);
    const newSelectedContract = contractData.contracts.find(
      (contract) => contract.contractType === newContractType
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
          {contractData.contracts.map((contract) => (
            <option key={contract.contractType} value={contract.contractType}>
              {contract.contractType}
            </option>
          ))}
        </select>
      </div>

      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {selectedContract &&
        selectedContract.sections.map((section, index) => (
          <React.Fragment key={index}>
            {section.title && <h2>{section.title}</h2>}
            <p>
              {section.content.replace(
                /{inputFields\[(\d+)\].value}/g,
                (_, i) =>
                  fields[parseInt(i)].value !== ""
                    ? fields[parseInt(i)].value
                    : fields[parseInt(i)].label
              )}
            </p>
          </React.Fragment>
        ))}

      <Button as={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
};

export default Contratos;
