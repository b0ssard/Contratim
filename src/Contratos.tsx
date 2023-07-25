import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Button from "./Button";
import "./Contratos.scss";
import ContractInputs from "./Inputs";
import ContractContent from "./ContractContent";

const Contratos: React.FC = () => {
  const initialFields = [
    { label: "Nome do Proprietário", value: "" },
    { label: "Endereço do Proprietário", value: "" },
    { label: "Nome do Locatário", value: "" },
    { label: "Endereço do Locatário", value: "" },
    { label: "Endereço do Imóvel", value: "" },
    { label: "Descrição do Imóvel", value: "" },
    { label: "Data de Início", value: "" },
    { label: "Duração do Contrato", value: "" },
    { label: "Valor do Aluguel", value: "" },
    { label: "Meio de Pagamento", value: "" },
    { label: "Informações da Conta Bancária", value: "" },
    { label: "Valor da Caução", value: "" },
    { label: "Prazo de Devolução da Caução", value: "" },
    { label: "Prazo de Aviso Prévio", value: "" },
    { label: "País/Estado", value: "" },
    { label: "Data da Assinatura", value: "" },
  ];

  const [fields, setFields] = useState(initialFields);

  const handleFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  return (
    <Box className="custom-container">
      <ContractInputs fields={fields} handleFieldChange={handleFieldChange} />

      <ContractContent fields={fields} />

      <Button as={Link} to="/">
        Voltar
      </Button>
    </Box>
  );
};

export default Contratos;
