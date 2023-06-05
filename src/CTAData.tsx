import { CTAProps } from "./CTA";

const CTAData: CTAProps[] = [
  {
    heading: "Card 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl: "https://example.com/image1.jpg",
    buttonText: "Clique Aqui",
    buttonOnClick: () => alert("Botão 1 clicado!"),
  },
  {
    heading: "Card 2",
    text: "Nullam euismod, lacus vel venenatis consequat, purus sem consequat felis.",
    imageUrl: "https://example.com/image2.jpg",
    buttonText: "Clique Aqui",
    buttonOnClick: () => alert("Botão 2 clicado!"),
  },
  {
    heading: "Card 3",
    text: "Vestibulum interdum felis a libero rhoncus, ut tincidunt nisi facilisis.",
    imageUrl: "https://example.com/image3.jpg",
    buttonText: "Clique Aqui",
    buttonOnClick: () => alert("Botão 3 clicado!"),
  },
];

export default CTAData;
