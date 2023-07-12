import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import Register from "./Register";
import AboutUs from "./AboutUs";
import "./App.scss";

const App: FC = () => {
  return (
    <ChakraProvider>
      <div className="app">
        <Navbar />
        <AboutUs />
        <CTA />
        <Register />
        <Footer />
      </div>
    </ChakraProvider>
  );
};

export default App;
