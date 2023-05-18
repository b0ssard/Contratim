import { Box, Flex, Link } from "@chakra-ui/react";
import Button from "./Button";
import "./Navbar.scss";
import { NavbarProps } from "./NavbarData";

export type NavbarData = {
  id: number;
  label: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};


export default function Navbar(): JSX.Element {
  return (
    <Flex className="navbar">
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        <Button onClick={() => alert("Botão clicado!")}>Entrar</Button>
        {NavbarProps.map((link: NavbarData) => (
          <Link key={link.id} className="navbar-item" onClick={link.onClick}>
            {link.label}
          </Link>
        ))}
      </Box>
    </Flex>
  );
}
