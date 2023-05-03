import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

export default function App() {
  return (
    <div className="#root">
      <ChakraProvider>
        <div>
          <h1>CONTRATIM</h1>
        </div>
      </ChakraProvider>
    </div>
  );
}
