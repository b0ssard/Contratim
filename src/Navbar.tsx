import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Button from "./Button";
import OpenModal from "./Modal";
import Register from "./Register";
import NavbarLink from "./NavbarLink";
import "./Navbar.scss";
import SignIn from "./SignIn";

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

  return (
    <Flex className="navbar">
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        {user.email !== undefined ? (
          <Box>
            <Flex direction="row" alignItems="center">
              <Text className="navbar-item" marginRight="10px">
                Logged in as: {user.email}
              </Text>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Flex>
          </Box>
        ) : (
          <>
            <OpenModal
              content={<SignIn />}
              title="Faça seu login."
              component={() => <Button>Entrar</Button>}
              label="Entrar"
            />
            <OpenModal
              content={<Register />}
              title="Faça seu cadastro"
              component={() => <NavbarLink label="Cadastre-se" />}
              label="Cadastre-se"
            />
            <NavbarLink
              label="Sobre"
              onClick={() => alert("Link Sobre clicado!")}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
