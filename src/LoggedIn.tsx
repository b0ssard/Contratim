import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Button from "./Button";

interface LoggedInContentProps {
  userEmail: string;
  onSignOut: () => void;
}

const LoggedInContent: React.FC<LoggedInContentProps> = ({
  userEmail,
  onSignOut,
}) => (
  <Box>
    <Flex direction="row" alignItems="center">
      <Text className="navbar-item" marginRight="10px">
        Bem vindo, {userEmail}!
      </Text>
      <Button onClick={onSignOut}>Sign Out</Button>
    </Flex>
  </Box>
);

export default LoggedInContent;
