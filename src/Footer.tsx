import { Flex, Link, Text } from "@chakra-ui/react";
import links from "./FooterData";
import "./Footer.css"; 

export default function Footer() {
  return (
    <Flex
      as="footer"
      className="footer"
      justify="space-between"
    >
      <Text className="footer__text" fontWeight="semibold">
        Por Victor Bossard © {new Date().getFullYear()}.
      </Text>
      <Flex as="ul" className="footer__links">
        {links.map((link) => (
          <Link
            key={link.href}
            className="footer__links-item" 
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
