import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";
import ContractTypeSelector from "./ContractTypeSelector";
import { db } from "./Firebase";
import { getDocs, collection } from "firebase/firestore";
interface Contract {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: InputField[];
}
interface Section {
  title: string | null;
  content: string;
}
interface InputField {
  label: string;
  value: string;
}

const Contracts: React.FC = () => {
  const [selectedContractType, setSelectedContractType] = useState<string>("");
  const [fields, setFields] = useState<InputField[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );
        setContracts(contractsData);
        setSelectedContractType(contractsData[0]?.contractType || "");
        setFields(contractsData[0]?.inputFields || []);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, []);

  const handleContractTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedContractType = event.target.value;
    setSelectedContractType(newSelectedContractType);

    const newSelectedContract = contracts.find(
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
        contracts={contracts}
      />

      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {selectedContractType && (
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