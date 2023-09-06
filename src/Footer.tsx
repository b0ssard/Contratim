import { Flex, Link, Text } from "@chakra-ui/react";
import { Links } from "./footer-data";
import "./Footer.scss";

const Footer = () => {
  return (
    <Flex as="footer" className="footer" justify="space-between">
      <Text className="footer__text" fontWeight="semibold">
        Por Victor Bossard © {new Date().getFullYear()}.
      </Text>
      <Flex as="ul" className="footer__links">
        {Links.map((link) => (
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
};

export default Footer;