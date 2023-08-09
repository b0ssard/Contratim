import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import contractData from "./contractData.json";

const replacePlaceholders = (
  content: string,
  fields: Array<{ label: string; value: string }>
) => {
  let replacedContent = content;
  fields.forEach((field, index) => {
    const placeholder = `{inputFields[${index}].value}`;
    const replacement = field.value !== "" ? field.value : field.label;
    replacedContent = replacedContent.replace(placeholder, replacement);
  });
  return replacedContent;
};


interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
}


const ContractContent: React.FC<ContractContentProps> = ({
  fields,
  selectedContractType,
}) => {
  const selectedContract = contractData.contracts.find(
    (contract) => contract.contractType === selectedContractType
  );

  if (!selectedContract) {
    return null;
  }

  return (
    <Box>
      <h1>{selectedContract.header}</h1>

      {selectedContract.sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.title && (
            <Heading as="h2" fontSize="lg" mt={4}>
              {section.title}
            </Heading>
          )}
          <Text>{replacePlaceholders(section.content, fields)}</Text>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ContractContent;
