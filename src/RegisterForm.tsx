import React from "react";
import { Box } from "@chakra-ui/react";
import LogInForm from "./LogInForm";

interface RegisterFormProps {
  credentials: { email: string; password: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  credentials,
  handleInputChange,
  register,
  loginWithGoogle,
}) => {
  return (
    <Box p={4} flex={1}>
      <LogInForm
        credentials={credentials}
        handleInputChange={handleInputChange}
        submitAction={register}
        googleLoginAction={loginWithGoogle}
        submitButtonText="Registrar"
        googleButtonText="Registrar com o Google"
      />
    </Box>
  );
};

export default RegisterForm;
