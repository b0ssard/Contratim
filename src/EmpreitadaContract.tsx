import React from "react";
import GenericContract from "./GenericContract";

const EmpreitadaContract: React.FC = () => {
  const initialFields = [
    { label: "Nome do Empreiteiro", value: "" },
    { label: "Endereço do Empreiteiro", value: "" },
    { label: "Descrição da Tarefa", value: "" },
    { label: "Data de Início", value: "" },
    { label: "Prazo de Conclusão", value: "" },
    { label: "Valor do Contrato", value: "" },
    { label: "Meio de Pagamento", value: "" },
    { label: "Informações da Conta Bancária", value: "" },
    { label: "País/Estado", value: "" },
    { label: "Data da Assinatura", value: "" },
  ];

  // ... Customize the fields as needed for Empreitada contract ...
  const customizedFields = [...initialFields];

  return (
    <GenericContract contractType="EMPREITADA" fields={customizedFields} />
  );
};

export default EmpreitadaContract;
