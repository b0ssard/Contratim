import React from "react";
import GenericContract from "./GenericContract";

const AluguelContract: React.FC = () => {
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

  // ... Customize the fields as needed for Aluguel contract ...
  const customizedFields = [...initialFields];

  return <GenericContract contractType="ALUGUEL" fields={customizedFields} />;
};

export default AluguelContract;
