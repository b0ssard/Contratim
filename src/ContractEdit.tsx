import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
import ContractInputs from "./ContractInputs";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Contract } from "./utils";

const ContractEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editedContract, setEditedContract] = useState<Contract | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (id) {
          const contractDoc = doc(db, "contracts", id);
          const contractData = await getDoc(contractDoc);
          if (contractData.exists()) {
            setEditedContract(contractData.data() as Contract);
          } else {
            alert("Contrato inexistente!");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar contrato:", error);
      }
    };

    fetchContract();
  }, [id]);

  return (
    <Grid templateColumns="1fr 1fr" className="custom-container">
      <Box p={[2, 4, 6]}>
        {editedContract && (
          <ContractInputs
            fields={editedContract.fields.map((field) => ({
              label: field.label,
              value: field.value,
            }))}
            handleFieldChange={(index, event) => {
              const updatedFields = [...editedContract.fields];
              updatedFields[index].value = event.target.value;
              setEditedContract({
                ...editedContract,
                fields: updatedFields,
              });
            }}
          />
        )}
      </Box>
    </Grid>
  );
};

export default ContractEdit;
