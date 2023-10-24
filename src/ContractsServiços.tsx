import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

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
          '{proprietario.nome}, residente(s) em {proprietario.endereco}, adiante denominado "Proprietário".',
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
          'e o(s) locatário(s), {locatario.nome}, residente(s) em {locatario.endereco}, adiante denominado "Locatário".',
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
    <div>
      <h1>{contractData.header}</h1>
      <ReactMarkdown>{replacePlaceholders(contractData.content)}</ReactMarkdown>

      {contractData.sections.map((section) => (
        <div key={section.id}>
          {section.title && <h2>{section.title}</h2>}
          <ReactMarkdown>{replacePlaceholders(section.content)}</ReactMarkdown>

          {Object.keys(section.inputFields).map((inputKey) => (
            <div key={inputKey}>
              <label>{section.inputFields[inputKey].label}:</label>
              <input
                type="text"
                value={formData[inputKey]}
                onChange={(e) => handleInputChange(inputKey, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContractsServiços;
