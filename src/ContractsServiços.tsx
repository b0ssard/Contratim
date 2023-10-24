import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Heading, Text, Input, Flex, VStack } from "@chakra-ui/react";
import { Section, FormData } from "./utils";
import contractData from "./contracts-data.json";

const ContractsServiços: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const ContractData = contractData.contracts2[0];

  const replacePlaceholders = (content: string) => {
    return content.replace(/\{(.+?)\}/g, (_, key) => formData[key] || "");
  };

  const handleInputChange = (inputKey: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputKey]: value,
    }));
  };

  const renderSection = (section: Section) => (
    <Box key={section.id} mt={4}>
      {section.title && (
        <Heading as="h2" size="lg">
          {section.title}
        </Heading>
      )}
      <ReactMarkdown>{replacePlaceholders(section.content)}</ReactMarkdown>
      <VStack spacing={4}>{renderInputFields(section.inputFields)}</VStack>
    </Box>
  );

  const renderInputFields = (
    inputFields: Record<string, { label: string } | undefined>
  ) => {
    return Object.keys(inputFields).map((inputKey) => (
      <Flex key={inputKey}>
        <Text>{inputFields[inputKey]?.label}:</Text>
        <Input
          type="text"
          value={formData[inputKey] || ""}
          onChange={(e) => handleInputChange(inputKey, e.target.value)}
        />
      </Flex>
    ));
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl">
        {ContractData.header}
      </Heading>
      <ReactMarkdown>
        {replacePlaceholders(ContractData.content)}
      </ReactMarkdown>
      {ContractData.sections.map(renderSection)}
    </Box>
  );
};

export default ContractsServiços;
