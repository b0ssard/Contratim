import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";

const Contracts: React.FC = () => {
  const { contractType } = useParams(); // Extract contractType from route parameters

  const [fields, setFields] = useState<InputField[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );

        // Filter contracts based on contractType
        const filteredContracts = contractsData.filter(
          (contract) => contract.contractType === contractType
        );

        setContracts(filteredContracts);

        if (filteredContracts.length > 0) {
          setFields(filteredContracts[0].inputFields);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, [contractType]); // Add contractType as a dependency to re-fetch when it changes

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

  return (
    <Box p={[2, 4, 6]} className="custom-container">
      {/* Render contract data based on the selected contractType */}
      {/* ... */}
      <Button as={Link} to="/" mt={4}>
        Voltar
      </Button>
    </Box>
  );
};

export default Contracts;
