import React from "react";
import { Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Section } from "./utils";

interface SectionProps {
  sections: Section[];
  fields: Array<{ label: string; value: string }>;
  selectedContract: {
    contractType: string;
    header: string;
    sections: Section[];
    inputFields: Array<{ label: string; value: string }>;
  } | null;
}

function processContent(
  content: string,
  fields: Array<{ label: string; value: string }>
) {
  return content.replace(/{inputFields\[(\d+)\]\.value}/g, (match, index) => {
    const fieldIndex = Number(index);
    if (fieldIndex >= 0 && fieldIndex < fields.length) {
      const fieldValue = fields[fieldIndex].value;
      return fieldValue !== "" ? fieldValue : fields[fieldIndex].label;
    }
    return match;
  });
}

const ContractSections: React.FC<SectionProps> = ({
  sections,
  fields,
}) => {
  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.title && (
            <Heading as="h2" fontSize="lg" mt={4} textAlign="center">
              {section.title}
            </Heading>
          )}
          <ReactMarkdown>
            {processContent(section.content, fields)}
          </ReactMarkdown>
        </React.Fragment>
      ))}
    </>
  );
};

export default ContractSections;
