import { Box } from '@chakra-ui/react';
import linkedinImage from './assets/linkedin.png';
import githubImage from './assets/github.png';
import emailImage from './assets/email.png';
import whatsappImage from './assets/whatsapp.png';

const links = [
  {
    label: <Box as="img" src={linkedinImage} alt="LinkedIn" />,
    href: 'https://www.linkedin.com/in/victorbossard/',
  },
  {
    label: <Box as="img" src={githubImage} alt="GitHub" />,
    href: 'https://github.com/b0ssard',
  },
  {
    label: <Box as="img" src={emailImage} alt="EMail" />,
    href: 'mailto:victorquindere@gmail.com',
  },
  {
    label: <Box as="img" src={whatsappImage} alt="WhatsApp" />,
    href: 'https://wa.me/5585988812838',
  },
];

export default links