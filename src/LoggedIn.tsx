import React from "react";
import Button from "./Button";
import { Box, Flex } from "@chakra-ui/react"; 
import "./LoginForm.scss";

interface LoggedInWindowProps {
  userEmail: string | null;
  handleSignOut: () => void;
}

export const LoggedIn: React.FC<LoggedInWindowProps> = ({
  userEmail,
  handleSignOut,
}) => {
  return (
    <Box className="form">
      <Flex direction="row" justifyContent="center">
        <Box className="logged">BEM VINDO, {userEmail}!</Box>{" "}
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Flex>
    </Box>
  );
};
