import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import RegisterForm from "./RegisterForm";
import "./Register.scss";

interface User {
  email: string | null;
}

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [user, setUser] = useState<User | null>(null); // Ajuste a tipagem para User | null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log("User registration successful!");
    } catch (error) {
      console.error("User registration error:", error);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Google login successful!");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        setUser({ email: user.email || null }); // Atualize o estado do usuário quando ele estiver logado
      } else {
        console.log("User is signed out");
        setUser(null); // Defina o estado do usuário como nulo quando ele estiver deslogado
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  // Defina classes CSS com base no estado do usuário
  const formClassName = user ? "logged-in-form" : "";

  return (
    <Flex>
      <RegisterForm
        credentials={credentials}
        handleInputChange={handleInputChange}
        register={register}
        loginWithGoogle={loginWithGoogle}
        formClassName={formClassName} // Passe a classe CSS como uma propriedade para RegisterForm
      />
      <Box p={4} flex={1} padding={20}>
        <Heading as="h2" size="lg" mb={2} textAlign="left">
          Registre-se Agora!
        </Heading>
        <Text textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed
          sagittis tellus. Sed nec elit sit amet arcu maximus aliquet. Fusce
          dapibus turpis sit amet massa commodo fringilla. Aliquam tincidunt
          ullamcorper dui, vitae auctor lorem convallis sed.
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
