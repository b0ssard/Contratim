import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";
import ContractInputs from "./ContractInputs";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Contract } from "./utils";

const ContractEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (id) {
          const contractDoc = doc(db, "filledContracts", id);
          const contractData = await getDoc(contractDoc);
          if (contractData.exists()) {
            setSelectedContract(contractData.data() as Contract);
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
        {selectedContract && (
          <ContractInputs
            fields={selectedContract.fields.map((field) => ({
              label: field.label,
              value: field.value,
            }))}
            handleFieldChange={(index, event) => {
              const updatedFields = [...selectedContract.fields];
              updatedFields[index].value = event.target.value;
              setSelectedContract({
                ...selectedContract,
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
