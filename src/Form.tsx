import React from "react";
import { Button, Box, Input } from "@chakra-ui/react";
import "./Form.scss";

interface FormProps {
  credentials: {
    email: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitAction: () => Promise<void>;
  submitButtonText: string;
}

export function Form({
  credentials,
  handleInputChange,
  submitAction,
  submitButtonText,
}: FormProps): JSX.Element {
  const { email, password } = credentials;

  return (
    <Box className="register-container">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        name="email"
        autoComplete="username"
        mb={4}
      />

      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={handleInputChange}
        name="password"
        autoComplete="current-password"
        mb={4}
      />

      <Button onClick={submitAction}>{submitButtonText}</Button>
    </Box>
  );
}
