import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Button from "./Button";
import OpenModal from "./Modal";
import Register from "./Register";
import NavbarLink from "./NavbarLink";
import SignIn from "./SignIn";
import "./Navbar.scss";

export interface User {
  email?: string | null;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email });
      } else {
        setUser({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  const { email } = user;

  const renderLoggedInContent = () => (
    <Box>
      <Flex direction="row" alignItems="center">
        <Text className="navbar-item" marginRight="10px">
          Logged in as: {email}
        </Text>
        <Button onClick={handleSignOut}>Sign Out</Button>
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
        content={<Register />}
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
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        {email !== undefined
          ? renderLoggedInContent()
          : renderLoggedOutContent()}
      </Box>
    </Flex>
  );
};

export default Navbar;
