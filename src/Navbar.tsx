import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { auth } from "./firebase-config";
import Button from "./Button";
import OpenModal from "./Modal";
import RegisterForm from "./RegisterForm";
import NavbarLink from "./NavbarLink";
import SignIn from "./SignIn";
import { LoggedIn } from "./LoggedIn";
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
      setUser(user ? { email: user.email } : { email: null });
    });

    return unsubscribe;
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

  const loggedInContent = (
    <LoggedIn userEmail={user.email} handleSignOut={handleSignOut} />
  );

  const loggedOutContent = (
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

  return (
    <Flex className="navbar">
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        {user.email !== null ? loggedInContent : loggedOutContent}
      </Box>
    </Flex>
  );
};

export default Navbar;
