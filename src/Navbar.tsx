import { Box, Flex, Link } from "@chakra-ui/react";
import "./Navbar.css";
import navbarLinks from "./NavbarData";

type NavbarLink = {
  id: number;
  label: string;
  href: string;
};

export default function Navbar(): JSX.Element {
  return (
    <Flex className="navbar">
      <Box>
        <Link href="#">Logo</Link>
      </Box>
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

// import { Box, Flex, Link } from "@chakra-ui/react";
// import "./Navbar.css";
// import navbarLinks from "./NavbarData";

// export default function Navbar() {
//   return (
//     <Flex className="navbar">
//       <Box>
//         <Link href="#">
//           Logo
//         </Link>
//       </Box>
//       <Box className="navbar-list">
//         {navbarLinks.map((link) => (
//           <Link key={link.id} className="navbar-item" href={link.href}>
//             {link.label}
//           </Link>
//         ))}
//       </Box>
//     </Flex>
//   );
// }
