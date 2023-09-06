import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
}

interface Section {
  title: string | null;
  content: string;
}

interface ContractData {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: Array<{ label: string; value: string }>;
}

const replacePlaceholders = (
  content: string,
  fields: Array<{ label: string; value: string }>
) => {
  return content.replace(/{inputFields\[(\d+)\]\.value}/g, (_, index) => {
    const fieldValue = fields[Number(index)].value;
    const fieldLabel = fields[Number(index)].label;
    return fieldValue !== "" ? fieldValue : fieldLabel;
  });
};

const ContractContent: React.FC<ContractContentProps> = ({
  fields,
  selectedContractType,
}) => {
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));

        const contractsData: ContractData[] = contractsCollection.docs.map(
          (doc) => doc.data() as ContractData
        );

        const contract = contractsData.find(
          (contract) => contract.contractType === selectedContractType
        );

        setSelectedContract(contract || null);
      } catch (error) {
        console.error("Error fetching contracts:", error);
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

      {selectedContract.sections.map((section, index) => (
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
      ))}
    </Box>
  );
};

export default ContractContent;
