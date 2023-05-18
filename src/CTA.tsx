import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Button from "./Button";

export type CTAProps = {
  heading: string;
  description: string;
  buttonText: string;
  buttonOnClick: () => void;
};

const CTA: React.FC<CTAProps> = ({
  heading,
  description,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <Box p={4} bg="gray.100">
      <Heading as="h2" size="lg" mb={2}>
        {heading}
      </Heading>
      <Text mb={4}>{description}</Text>
      <Button onClick={buttonOnClick}>{buttonText}</Button>
    </Box>
  );
};

export default CTA;
