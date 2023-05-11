import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

const App: FC = () => {
  return (
    <div className="#root">
      <ChakraProvider>
        <Navbar />
        <h1>CONTRATIM</h1>
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default App;
