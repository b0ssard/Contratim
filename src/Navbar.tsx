import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";
import navbarLinks from "./NavbarData";

export default function Navbar() {
  return (
    <Flex className="navbar">
      <Box>
        <Link className="navbar-item" href="#">
          Logo
        </Link>
      </Box>
      <Box className="navbar-list">
        {navbarLinks.map((link) => (
          <Link key={link.id} className="navbar-item" href={link.href}>
            {link.label}
          </Link>
        ))}
      </Box>
    </Flex>
  );
}
