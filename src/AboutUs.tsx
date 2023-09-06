import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";

const AboutUs: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));
        const contractsData = contractsCollection.docs.map(
          (doc) => doc.data() as Contract
        );

        setContracts(contractsData);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, []);

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
    <Box p={4}>
      <Heading as="h2" size="lg" mb={2}>
        About Us
      </Heading>
      <Text textAlign="justify" margin="15px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed
        sagittis tellus. Sed nec elit sit amet arcu maximus aliquet. Fusce
        dapibus turpis sit amet massa commodo fringilla. Aliquam tincidunt
        ullamcorper dui, vitae auctor lorem convallis sed.
      </Text>
      {contracts.map((contract, index) => (
        <Button
          key={index}
          as={Link}
          to={`/contract/${contract.contractType}`} // Você pode definir a rota adequada aqui
          mt={2} // Define a margem superior para espaçar os botões
        >
          {contract.header}
        </Button>
      ))}
    </Box>
  );
};

export default AboutUs;
