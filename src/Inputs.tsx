import React from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

interface ContractInputsProps {
  fields: Array<{ label: string; value: string }>;
  handleFieldChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const ContractInputs: React.FC<ContractInputsProps> = ({
  fields,
  handleFieldChange,
}) => {
  return (
    <>
      {fields.map((field, index) => (
        <FormControl key={index} mb={2}>
          <FormLabel>{field.label}</FormLabel>
          <Input
            type="text"
            value={field.value}
            onChange={(event) => handleFieldChange(index, event)}
            placeholder={field.label}
            size="md"
            borderRadius="md"
            _focus={{ borderColor: "blue.500" }}
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
      ))}
    </>
  );
};

export default ContractInputs;
