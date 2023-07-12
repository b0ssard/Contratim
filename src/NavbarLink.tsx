import React from "react";
import { Link } from "@chakra-ui/react";

interface NavbarLinkProps {
  label: string;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ label, onClick }) => (
  <Link className="navbar-item" onClick={onClick}>
    {label}
  </Link>
);

export default NavbarLink;
