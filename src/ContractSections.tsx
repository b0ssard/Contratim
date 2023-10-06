import React from "react";
import jsPDF from "jspdf";
import Button from "./Button";
import { Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Section, InputField } from "./utils";

interface ContractSectionsProps {
  sections: Section[];
  fields: InputField[];
  selectedContract: {
    contractType: string;
    header: string;
    sections: Section[];
    inputFields: InputField[];
  } | null;
}

const ContractSections: React.FC<ContractSectionsProps> = ({
  sections,
  fields,
  selectedContract,
}) => {
  function processContent(content: string) {
    return content.replace(/{inputFields\[(\d+)\]\.value}/g, (match, index) => {
      const fieldIndex = Number(index);
      if (fieldIndex >= 0 && fieldIndex < fields.length) {
        const fieldValue = fields[fieldIndex].value;
        return fieldValue !== "" ? fieldValue : fields[fieldIndex].label;
      }
      return match;
    });
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    if (selectedContract) {
      doc.setFontSize(24);
      doc.text(selectedContract.header || "", 10, yPosition);
      yPosition += 10;

      doc.setFontSize(16);
      selectedContract.sections.forEach((section) => {
        if (section.title) {
          doc.text(section.title, 10, yPosition);
          yPosition += 10;
        }
        doc.setFontSize(12);
        doc.text(processContent(section.content), 10, yPosition);
        yPosition += 10;
      });

      doc.save("meu-arquivo.pdf");
    }
  };

  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.title && (
            <Heading as="h2" fontSize="lg" mt={4} textAlign="center">
              {section.title}
            </Heading>
          )}
          <ReactMarkdown>{processContent(section.content)}</ReactMarkdown>
        </React.Fragment>
      ))}
      <Button onClick={generatePDF}>Generate PDF</Button>
    </>
  );
};

export default ContractSections;
