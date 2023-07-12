import React, { MouseEventHandler } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

type ButtonProps = ChakraButtonProps & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ChakraButton colorScheme="purple" marginBottom="10px" {...rest}>
    {children}
  </ChakraButton>
);

export default Button;
