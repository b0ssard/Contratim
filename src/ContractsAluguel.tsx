import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
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
  <Grid templateColumns="1fr 1fr" className="custom-container">
    <Box p={[2, 4, 6]}>
      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />
    </Box>

    <Box p={[2, 4, 6]}>
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
  </Grid>
);
};

export default ContractsAluguel;
