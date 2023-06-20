import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import Login from "./Login";
import "./App.scss";
import AboutUs from "./AboutUs";

const App: FC = () => {
  return (
    <div className="#root">
      <ChakraProvider>
        <Navbar />
        <AboutUs />
        <CTA />
        <Login />
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default App;
