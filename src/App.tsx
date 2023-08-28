import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contracts from "./Contracts";
import AboutUs from "./AboutUs";
import CTA from "./CTA";
import Register from "./Register";

const App: React.FC = () => {
  return (
    <Router>
      <ChakraProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contratos" element={<ContratosPage />} />
          </Routes>
          <Footer />
        </div>
      </ChakraProvider>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <AboutUs />
      <CTA />
      <Register />
    </div>
  );
};

const ContratosPage: React.FC = () => {
  return (
    <div>
        <Contracts />
    </div>
  );
};

export default App;
