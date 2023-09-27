import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
import { getDocs, doc, getDoc, collection } from "firebase/firestore";
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

const ContractEdit: React.FC = () => {
  const [fields, setFields] = useState<InputField[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentId = "01V4G3Aiz7tSZV0KROR4";
        const filledContractDocRef = doc(db, "filledcontracts", documentId);
        const filledContractDoc = await getDoc(filledContractDocRef);

        if (filledContractDoc.exists()) {
          const filledContractData = filledContractDoc.data() as Contract;
          setFields(filledContractData.inputFields);
        }

        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );

        setContracts(contractsData);
      } catch (error) {
        console.error("Erro ao buscar contratos preenchidos:", error);
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
        <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />
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

export default ContractEdit;
