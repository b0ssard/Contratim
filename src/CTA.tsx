import React from "react";
import { Box, Flex, Card, Heading, Text, Image } from "@chakra-ui/react";
import Button from "./Button";
import CTAData from "./CTAData";

export type CTAProps = {
  heading: string;
  text: string;
  imageUrl: string;
  buttonText: string;
  buttonOnClick: () => void;
};

const CTA: React.FC = () => {
  return (
    <Box p={4} bg="gray.100">
      <Heading as="h2" size="lg" mb={2}>
        CALL TO ACTION
      </Heading>
      <Flex>
        {CTAData.map((card, index) => (
          <Card key={index} flex="1" mr={4}>
            <Heading as="h3" size="md" my={2}>
              {card.heading}
            </Heading>
            <Text>{card.text}</Text>
            <Image src={card.imageUrl} alt="Card Image" />
            <Button onClick={card.buttonOnClick}>{card.buttonText}</Button>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default CTA;
