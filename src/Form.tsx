import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Box, Input, Text, Flex } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import "./Form.scss";

export interface User {
  email?: string | undefined;
}
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
  const [user, setUser] = useState<{ email?: string }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email || undefined });
      } else {
        setUser({ email: undefined });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user.email !== undefined ? (
        <Box className="cadeia">
          <Flex direction="row" justifyContent="center">
            <Text className="logged">Logged in as: {user.email}</Text>
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
          </Flex>
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
