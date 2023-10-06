// ContractsAluguel.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "./firebase-config";
import ContractInputs from "./ContractInputs";
import ContractContent from "./ContractContent";
import Button from "./Button";
import { Contract, InputField } from "./utils";

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

const ContractsAluguel: React.FC = () => {
  const [fields, setFields] = useState<InputField[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );

        if (contractsData.length > 0) {
          setFields(contractsData[0].inputFields);
        }

        setContracts(contractsData);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();

    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userInfo: UserInfo = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
        };
        setUser(userInfo);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const newField: InputField = {
      id: `field_${fields.length + 1}`,
      label: `Field ${fields.length + 1}`,
      value: "",
    };

    setFields([...fields, newField]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const selectedContractType = "Aluguel";

  const renderContractContent = () => {
    if (contracts.length > 0) {
      const formattedFields = fields.map((field) => ({
        label: field.label,
        value: field.value,
        id: field.id,
      }));

      return (
        <ContractContent
          fields={formattedFields}
          selectedContractType={selectedContractType}
          user={user}
          userEmail={user?.email || ""}
        />
      );
    }

    return null;
  };

  return (
    <Grid templateColumns="1fr 1fr" className="custom-container">
      <Box p={[2, 4, 6]}>
        <ContractInputs
          fields={fields}
          handleFieldChange={handleFieldChange}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
        />
      </Box>

      <Box p={[2, 4, 6]}>
        {renderContractContent()}

        <Button as={Link} to="/" mt={4}>
          Voltar
        </Button>
      </Box>
    </Grid>
  );
};

export default ContractsAluguel;
