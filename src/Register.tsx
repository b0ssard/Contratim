import React, { useState } from "react";
import Button from "./Button";
import { auth } from "./Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Input } from "@chakra-ui/react";
import "@chakra-ui/react";
import "./Register.scss";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Box className="register-container">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        mb={4}
      />

      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        mb={4}
      />

      <Button onClick={register}>Entrar</Button>
    </Box>
  );
};

export default Register;
