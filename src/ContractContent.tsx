import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { Section } from "./utils";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
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
  const regex = /{inputFields\[(\d+)\]\.value}/g;
  return content.replace(regex, (match, index) => {
    const fieldIndex = Number(index);
    if (fieldIndex >= 0 && fieldIndex < fields.length) {
      const fieldValue = fields[fieldIndex].value;
      const fieldLabel = fields[fieldIndex].label;
      return fieldValue !== "" ? fieldValue : fieldLabel;
    }
    return match;
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
