import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import CTAData from "./cta-data.json";
import Card, { CardProps } from "./Card";

const CTA: React.FC = () => {
  const data: CardProps[] = CTAData.map((item) => ({
    ...item,
    buttonOnClick: eval(`(${item.buttonOnClick})`),
  }));

  return (
    <Box p={4} bg="gray.100">
      <Heading as="h2" size="lg" mb={2}>
        CALL TO ACTION
      </Heading>
      <Flex justifyContent="space-evenly">
        {data.map((card: CardProps, index: number) => (
          <Card key={index} {...card} />
        ))}
      </Flex>
    </Box>
  );
};

export default CTA;
