import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import Register from "./Register";
import "./App.scss";
import AboutUs from "./AboutUs";
import SignIn from "./SignIn";

const App: FC = () => {
  return (
    <div className="#root">
      <ChakraProvider>
        <Navbar />
        <AboutUs />
        <SignIn />
        <CTA />
        <Register />
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default App;
