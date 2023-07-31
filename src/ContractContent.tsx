import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import contractData from "./contractData.json";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
}

const replacePlaceholders = (
  content: string,
  fields: Array<{ label: string; value: string }>
) => {
  let replacedContent = content;
  fields.forEach((field, index) => {
    const placeholder = `{field-${index}}`;
    replacedContent = replacedContent.replace(placeholder, field.value);
  });
  return replacedContent;
};

const ContractContent: React.FC<ContractContentProps> = ({ fields }) => {
  return (
    <Box>
      <h1>{contractData.header}</h1>

      {contractData.sections.map((section, index) => (
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
