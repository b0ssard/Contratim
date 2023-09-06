import React, { useState, useEffect } from "react";
import LogInForm from "./LogInForm";
import { auth } from "./Firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const SignIn: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log("Sign-in successful!");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Google sign-in successful!");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("User is signed out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <LogInForm
      credentials={credentials}
      handleInputChange={handleInputChange}
      submitAction={signIn}
      googleLoginAction={signInWithGoogle}
      submitButtonText="Entrar"
      googleButtonText="Entrar com o Google"
    />
  );
};

export default SignIn;
