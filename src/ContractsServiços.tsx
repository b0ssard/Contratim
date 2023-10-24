import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Heading, Text, Input, Flex, VStack } from "@chakra-ui/react";
import { Section, FormData } from "./utils";
import contractData from "./contracts-data.json";

const ContractsServiços: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  const replacePlaceholders = (content: string) => {
    return content.replace(/\{(.+?)\}/g, (_, key) => formData[key] || "");
  };

  const handleInputChange = (inputKey: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputKey]: value,
    }));
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl">
        {contractData.header}
      </Heading>
      <ReactMarkdown>{replacePlaceholders(contractData.content)}</ReactMarkdown>

      {contractData.sections.map((section: Section) => (
        <Box key={section.id} mt={4}>
          {section.title && (
            <Heading as="h2" size="lg">
              {section.title}
            </Heading>
          )}
          <ReactMarkdown>{replacePlaceholders(section.content)}</ReactMarkdown>

          <VStack spacing={4}>
            {Object.keys(section.inputFields).map((inputKey) => (
              <Flex key={inputKey}>
                <Text>{section.inputFields[inputKey]?.label}:</Text>
                <Input
                  type="text"
                  value={formData[inputKey]}
                  onChange={(e) => handleInputChange(inputKey, e.target.value)}
                />
              </Flex>
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default ContractsServiços;
