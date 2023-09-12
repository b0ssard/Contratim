import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { Contract } from "./utils";
import Button from "./Button";

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
          to={`/Contracts${contract.contractType}`}
          mt={2}
          margin="5px"
        >
          {contract.header}
        </Button>
      ))}
    </Box>
  );
};

export default AboutUs;
