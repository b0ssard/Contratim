import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Contratos from "./Contratos";
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
            <Route
              path="/"
              element={
                <div>
                  <AboutUs />
                  <CTA />
                  <Register />
                </div>
              }
            />
            <Route path="/contratos" element={<Contratos />} />
          </Routes>
          <Footer />
        </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
