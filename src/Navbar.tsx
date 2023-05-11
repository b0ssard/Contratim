import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";
import Button from "./Button";
import navbarLinks from "./NavbarData";

export type NavbarLink = {
  id: number;
  label: string;
  href: string;
};

export default function Navbar(): JSX.Element {
  return (
    <Flex className="navbar">
      <Box>Logo</Box>
      <Box className="navbar-list">
        <Button onClick={() => alert("Botão clicado!")}>
          Clique aqui
        </Button>
        {/* {navbarLinks.map((link: NavbarLink) => (
          <Link key={link.id} className="navbar-item" href={link.href}>
            {link.label}
          </Link>
        ))} */}
      </Box>
    </Flex>
  );
}
