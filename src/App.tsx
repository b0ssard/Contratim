import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import "./App.scss";
import CTAData from "./CTAData";
import AboutUs from "./AboutUs";

const App: FC = () => {
  return (
    <div className="#root">
      <ChakraProvider>
        <Navbar />
        <AboutUs />
        {CTAData.map((cta) => (
          <CTA key={cta.heading} {...cta} />
        ))}
        <Footer />
      </ChakraProvider>
    </div>
  );
};

export default App;
