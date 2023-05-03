import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <Flex className="navbar">
      <Box className="navbar-list">
        <Link className="navbar-item" href="#">
          Logo
        </Link>
      </Box>
      <Box className="navbar-list">
        <Link className="navbar-item" href="#">
          Link 1
        </Link>
        <Link className="navbar-item" href="#">
          Link 2
        </Link>
        <Link className="navbar-item" href="#">
          Link 3
        </Link>
      </Box>
    </Flex>
  );
}
