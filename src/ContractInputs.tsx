import React from "react";
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react";

interface ContractInputsProps {
  fields: Array<{ label: string; value: string }>;
  handleFieldChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
}

const ContractInputs: React.FC<ContractInputsProps> = ({
  fields,
  handleFieldChange,
  handleAddField,
  handleRemoveField,
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
          <Button
            onClick={() => handleRemoveField(index)}
            colorScheme="red"
            mt={2}
          >
            Remove
          </Button>
        </FormControl>
      ))}
      <Button onClick={handleAddField} colorScheme="green" mt={4}>
        Add Field
      </Button>
    </>
  );
};

export default ContractInputs;
