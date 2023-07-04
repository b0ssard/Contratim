import React, { useState } from "react";
import { Form } from "./Form";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Form
      credentials={credentials}
      handleInputChange={handleInputChange}
      submitAction={login}
      submitButtonText="Entrar"
    />
  );
};

export default Register;
