import React from "react";
import Button from "./Button";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={2}>
        About Us
      </Heading>
      <Text textAlign="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed
        sagittis tellus. Sed nec elit sit amet arcu maximus aliquet. Fusce
        dapibus turpis sit amet massa commodo fringilla. Aliquam tincidunt
        ullamcorper dui, vitae auctor lorem convallis sed.
      </Text>
      <Button as={Link} to="/contratos">
        Go to Contratos Page
      </Button>
    </Box>
  );
};

export default AboutUs;
