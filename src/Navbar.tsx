import { Box, Flex, Link, LinkProps } from "@chakra-ui/react";
import Button from "./Button";
import "./Navbar.scss";

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
  return (
    <Flex className="navbar">
      <Box className="navbar-logo">CONTRATIM</Box>
      <Box className="navbar-list">
        <Button onClick={() => alert("Botão clicado!")}>Entrar</Button>
        <NavbarLink
          label="Cadastre-se"
          onClick={() => alert("Link Cadastre-se clicado!")}
        />
        <NavbarLink
          label="Sobre"
          onClick={() => alert("Link Sobre clicado!")}
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
