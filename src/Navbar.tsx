import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { auth } from "./firebase-config";
import Button from "./Button";
import OpenModal from "./Modal";
import RegisterForm from "./RegisterForm";
import NavbarLink from "./NavbarLink";
import SignIn from "./SignIn";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import "./Navbar.scss";

export interface User {
  email: string | null;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User>({ email: null });
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email });
      } else {
        setUser({ email: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  const renderLoggedInContent = () => (
    <Box>
      <Flex direction="row" alignItems="center">
        <Text className="navbar-item" marginRight="10px">
          Logged in as: {user.email}
        </Text>
        <Button onClick={handleSignOut}>Sign Out</Button>
        <NavbarLink
          label="Sobre"
          onClick={() => alert("Link Sobre clicado!")}
        />
      </Flex>
    </Box>
  );

  const renderLoggedOutContent = () => (
    <>
      <OpenModal
        content={<SignIn />}
        title="Faça seu login."
        component={({ onClick }) => <Button onClick={onClick}>Entrar</Button>}
        label="Entrar"
      />
      <OpenModal
        content={
          <RegisterForm
            credentials={credentials}
            handleInputChange={handleInputChange}
            register={register}
            loginWithGoogle={loginWithGoogle}
          />
        }
        title="Faça seu cadastro"
        component={({ onClick }) => (
          <NavbarLink label="Cadastre-se" onClick={onClick} />
        )}
        label="Cadastre-se"
      />
    </>
  );

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

  return (
    <Flex className="navbar">
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        {user.email !== null
          ? renderLoggedInContent()
          : renderLoggedOutContent()}
      </Box>
    </Flex>
  );
};

export default Navbar;
