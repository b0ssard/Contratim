import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import contractsData from "./contractsData.json";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
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
  const selectedContract = contractsData.contracts.find(
    (contract) => contract.contractType === selectedContractType
  );

  if (!selectedContract) {
    return null;
  }

  return (
    <Box p={4}>
      <Heading as="h1" fontSize={["xl", "2xl", "3xl"]} color="blue.500" mb={4}>
        {selectedContract.header}
      </Heading>

      {selectedContract.sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.title && (
            <Heading as="h2" fontSize="lg" mt={4} textAlign="center">
              {section.title}
            </Heading>
          )}
          <Text fontSize="md" mt={2}>
            {replacePlaceholders(section.content, fields)}
          </Text>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ContractContent;
