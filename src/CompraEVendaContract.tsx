import React from "react";
import GenericContract from "./GenericContract";

const CompraVendaContract: React.FC = () => {
  const initialFields = [
    { label: "Nome do Vendedor", value: "" },
    { label: "Endereço do Vendedor", value: "" },
    { label: "Nome do Comprador", value: "" },
    { label: "Endereço do Comprador", value: "" },
    { label: "Descrição do Produto", value: "" },
    { label: "Valor da Venda", value: "" },
    { label: "Meio de Pagamento", value: "" },
    { label: "Informações da Conta Bancária", value: "" },
    { label: "País/Estado", value: "" },
    { label: "Data da Assinatura", value: "" },
  ];

  // ... Customize the fields as needed for CompraVenda contract ...
  const customizedFields = [...initialFields];

  return (
    <GenericContract contractType="COMPRA E VENDA" fields={customizedFields} />
  );
};

export default CompraVendaContract;
