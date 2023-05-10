import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";
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
        {navbarLinks.map((link: NavbarLink) => (
          <Link key={link.id} className="navbar-item" href={link.href}>
            {link.label}
          </Link>
        ))}
      </Box>
    </Flex>
  );
}
