import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";
import Button from "./Button";
import OpenModal from "./Modal";
import RegisterForm from "./RegisterForm";
import NavbarLink from "./NavbarLink";
import SignIn from "./SignIn";
import LoggedInContent from "./LoggedIn";
import "./Navbar.scss";

interface User {
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
      <NavbarLink label="Sobre" onClick={() => alert("Link Sobre clicado!")} />
    </>
  );

  return (
    <Flex className="navbar">
      <Box className="navbar-logo"><Link to="/">CONTRATIM</Link></Box>
      <Box className="navbar-list">
        {user.email !== null ? (
          <LoggedInContent userEmail={user.email} onSignOut={handleSignOut} />
        ) : (
          renderLoggedOutContent()
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
