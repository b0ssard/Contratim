import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface ContractSection {
  title: string | null;
  content: string;
}

interface FirebaseContract {
  contractType: string;
  header: string;
  sections: ContractSection[];
}

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
}

const replacePlaceholders = (
  content: string,
  fields: Array<{ label: string; value: string }>
) => {
  return content.replace(/{inputFields\[(\d+)\]\.value}/g, (_, index) => {
    if (fields && fields[index] && fields[index].value) {
      const fieldValue = fields[index].value;
      const fieldLabel = fields[index].label;
      return fieldValue !== "" ? fieldValue : fieldLabel;
    }

    return "";
  });
};

const ContractContent: React.FC<ContractContentProps> = ({
  fields,
  selectedContractType,
}) => {
  const [selectedContract, setSelectedContract] =
    useState<FirebaseContract | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const contractsCollection = collection(db, "contracts");
        const contractsSnapshot = await getDocs(contractsCollection);

        contractsSnapshot.forEach((doc) => {
          const contractData = doc.data() as FirebaseContract;
          if (contractData.contractType === selectedContractType) {
            setSelectedContract(contractData);
          }
        });
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    fetchData();
  }, [selectedContractType]);

  if (!selectedContract) {
    return null;
  }

  return (
    <Box p={4}>
      <Heading as="h1" fontSize={["xl", "2xl", "3xl"]} mb={4}>
        {selectedContract.header}
      </Heading>

      {selectedContract.sections.map(
        (section: ContractSection, index: number) => (
          <React.Fragment key={index}>
            {section.title && (
              <Heading as="h2" fontSize="lg" mt={4} textAlign="center">
                {section.title}
              </Heading>
            )}
            <Text fontSize="md" mt={2} textAlign="justify">
              {replacePlaceholders(section.content, fields)}
            </Text>
          </React.Fragment>
        )
      )}
    </Box>
  );
};

export default ContractContent;
