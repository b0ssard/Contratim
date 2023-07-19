import React from "react";
import { Box, Heading, Text} from "@chakra-ui/react";
import Button from "./Button";

export type CardProps = {
  heading: string;
  text: string;
  imageUrl: string;
  buttonText: string;
  buttonOnClick: () => void;
};

const Card: React.FC<CardProps> = ({
  heading,
  text,
  // imageUrl,
  buttonText,
  buttonOnClick,
}) => {
  return (
    <Box p={4} bg="gray.100" maxW="300px">
      <Heading as="h2" size="lg" mb={2}>
        {heading}
      </Heading>
      <Text mb={4}>{text}</Text>
      {/* <Image src={imageUrl} alt={heading} mb={4} /> */}
      <Button onClick={buttonOnClick}>{buttonText}</Button>
    </Box>
  );
};

export default Card;
