import React, { useState } from "react";

const Contratos: React.FC = () => {
  const [fields, setFields] = useState([
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
  ]);

  const handleFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  const renderInputs = () => {
    return fields.map((field, index) => (
      <input
        key={index}
        type="text"
        value={field.value}
        onChange={(event) => handleFieldChange(index, event)}
        placeholder={field.label}
      />
    ));
  };

  return (
    <div>
      {renderInputs()}
      {/* conteúdo do contratos.tsx */}
    </div>
  );
};

export default Contratos;
