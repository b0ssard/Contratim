import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

export default function App() {
  return (
    <div className="#root">
      <ChakraProvider>
        <Navbar />
        <h1>CONTRATIM</h1>
        <Footer />
      </ChakraProvider>
    </div>
  );
}
