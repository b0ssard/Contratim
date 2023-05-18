import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";
import navbarData from "./NavbarData";

export type NavbarData = {
  id: number;
  label: string;
  href: string;
};

export default function Navbar(): JSX.Element {
  return (
    <Flex className="navbar">
      <Box>Contratim</Box>
      <Box className="navbar-list">
        <Link as="button" onClick={() => alert("Botão clicado!")}>
          Entrar
        </Link>
        {navbarData.map((link: NavbarData) => (
          <Link key={link.id} className="navbar-item" href={link.href}>
            {link.label}
          </Link>
        ))}
      </Box>
    </Flex>
  );
}
