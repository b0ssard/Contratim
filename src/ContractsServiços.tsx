import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Heading, Text, Input, Flex, VStack } from "@chakra-ui/react";

type FormData = Record<string, string>;

interface Section {
  id: string;
  title: string | null;
  content: string;
  inputFields: Record<string, { label: string }>;
}

interface Contract {
  header: string;
  content: string;
  sections: Section[];
}

const ContractsServiços: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});

  const contractData: Contract = {
    header: "CONTRATO DE ALUGUEL",
    content:
      'Este Contrato de Aluguel ("Contrato") é celebrado entre o(s) proprietário(s):',
    sections: [
      {
        id: "proprietario.dados",
        title: null,
        content:
          '**{proprietario.nome}**, residente(s) em **{proprietario.endereco}**, adiante denominado "Proprietário".',
        inputFields: {
          "proprietario.nome": {
            label: "Nome do Proprietário",
          },
          "proprietario.endereco": {
            label: "Endereço do Proprietário",
          },
        },
      },
      {
        id: "locatario.dados",
        title: null,
        content:
          'e o(s) locatário(s), **{locatario.nome}**, residente(s) em **{locatario.endereco}**, adiante denominado "Locatário".',
        inputFields: {
          "locatario.nome": {
            label: "Nome do Locatário",
          },
          "locatario.endereco": {
            label: "Endereço do Locatário",
          },
        },
      },
      {
        id: "objeto.dados",
        title: "1. OBJETO DO CONTRATO",
        content:
          'O Proprietário concorda em alugar a propriedade localizada em **{imovel.endereco}** ("Imóvel"), que consiste em **{imovel.descricao}** para o Locatário, com a finalidade exclusiva de uso residencial.',
        inputFields: {
          "imovel.endereco": {
            label: "Endereço do Imóvel",
          },
          "imovel.descricao": {
            label: "Descrição do Imóvel",
          },
        },
      },
    ],
  };

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

      {contractData.sections.map((section) => (
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
                <Text>{section.inputFields[inputKey].label}:</Text>
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
