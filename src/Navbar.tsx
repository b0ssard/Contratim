import { Box, Flex, Link, LinkProps, Text } from "@chakra-ui/react";
import Button from "./Button";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "./Navbar.scss";

export interface User {
  email?: string | null;
}

interface NavbarLinkProps extends LinkProps {
  label: string;
  onClick: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ label, onClick, ...rest }) => (
  <Link className="navbar-item" onClick={onClick} {...rest}>
    {label}
  </Link>
);

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
              <Button onClick={() => auth.signOut()}>Sign Out</Button>
            </Flex>
          </Box>
        ) : (
          <>
            <Button onClick={() => alert("Botão clicado!")}>Entrar</Button>
            <NavbarLink
              label="Cadastre-se"
              onClick={() => alert("Link Cadastre-se clicado!")}
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
