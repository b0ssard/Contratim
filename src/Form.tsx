import React from "react";
import Button from "./Button";
import { Box, Input, Text } from "@chakra-ui/react";
import { auth } from "./Firebase";
import "./Form.scss";

interface FormProps {
  credentials: {
    email: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitAction: () => Promise<void>;
  googleLoginAction: () => Promise<void>;
  submitButtonText: string;
  googleButtonText: string;
}

export function Form({
  credentials,
  handleInputChange,
  submitAction,
  googleLoginAction,
  submitButtonText,
  googleButtonText,
}: FormProps): JSX.Element {
  const { email, password } = credentials;
  const user = auth.currentUser;

  return (
    <div>
      {user ? (
        <Box mt={4}>
          <Text margin="10px">Logged in as: {user.email}</Text>
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        </Box>
      ) : (
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
          <Button onClick={googleLoginAction}>{googleButtonText}</Button>
        </Box>
      )}
    </div>
  );
}
