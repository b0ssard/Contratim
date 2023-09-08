import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import ContractInputs from "./ContractInputs";
import ContractContent from "./ContractContent";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { Contract, InputField } from "./utils";

const ContractsAluguel: React.FC = () => {
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
        if (contractsData.length > 0) {
          setFields(contractsData[0].inputFields);
        }
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
      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      {contracts.length > 0 && (
        <ContractContent
          fields={fields}
          selectedContractType={contracts[0].contractType}
        />
      )}

      <Button as={Link} to="/" mt={4}>
        Voltar
      </Button>
    </Box>
  );
};

export default ContractsAluguel;
