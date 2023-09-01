import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";
import { db } from "./firebase-config";
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
  const [fields, setFields] = useState<InputField[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );
        // CONTRATO SELECIONADO DA ARRAY!
        const selectedContract = contractsData[0];
        setContract(selectedContract);
        setFields(selectedContract?.inputFields || []);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, []);

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
      {contract && (
        <>
          <ContractInputs
            fields={fields}
            handleFieldChange={handleFieldChange}
          />

          <ContractContent
            fields={fields}
            selectedContractType={contract.contractType}
          />

          <Button as={Link} to="/" mt={4}>
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
};

export default Contracts;
