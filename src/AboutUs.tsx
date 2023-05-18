import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { AboutUsData } from "./AboutUsData";

const AboutUs: React.FC = () => {
  const { title, description } = AboutUsData;

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={2}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </Box>
  );
};

export default AboutUs;
