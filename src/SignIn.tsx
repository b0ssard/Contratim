import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";
import LogInForm from "./LogInForm";

const SignIn: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("Usuário não cadastrado!");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Google sign-in successful!");
      setError(null); 
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Usuário não cadastrado!");
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
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      <LogInForm
        credentials={credentials}
        handleInputChange={handleInputChange}
        submitAction={signIn}
        googleLoginAction={signInWithGoogle}
        submitButtonText="Entrar"
        googleButtonText="Entrar com o Google"
      />
    </div>
  );
};

export default SignIn;
