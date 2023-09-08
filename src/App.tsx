import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ContractsAluguel from "./ContractsAluguel";
import ContractsServiços from "./ContractsServiços";
import ContractsVenda from "./ContractsVenda";
import AboutUs from "./AboutUs";
import CTA from "./CTA";
import Register from "./Register";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <ChakraProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ContractsAluguel" element={<ContractsAluguel />} />
            <Route path="/ContractsServiços" element={<ContractsServiços />} />
            <Route path="/ContractsVenda" element={<ContractsVenda />} />
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

export default App;
