import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { db } from "./firebase-config";
import { getDocs, collection } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { Section } from "./utils";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
}

interface ContractData {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: Array<{ label: string; value: string }>;
}

const ContractContent: React.FC<ContractContentProps> = ({
  fields,
  selectedContractType,
}) => {
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsCollection = await getDocs(collection(db, "contracts"));

        const contractsData: ContractData[] = contractsCollection.docs.map(
          (doc) => doc.data() as ContractData
        );

        const contract = contractsData.find(
          (contract) => contract.contractType === selectedContractType
        );

        setSelectedContract(contract || null);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, [selectedContractType]);

  const processContent = (content: string) => {
    return content.replace(/{inputFields\[(\d+)\]\.value}/g, (match, index) => {
      const fieldIndex = Number(index);
      if (fieldIndex >= 0 && fieldIndex < fields.length) {
        const fieldValue = fields[fieldIndex].value;
        return fieldValue !== "" ? fieldValue : fields[fieldIndex].label;
      }
      return match;
    });
  };

  if (!selectedContract) {
    return null;
  }

return (
  <Box p={4} textAlign="justify">
    <Heading fontSize={["3xl"]} mb={7} textAlign="center">
      {selectedContract?.header}
    </Heading>

    {selectedContract &&
      Array.isArray(selectedContract.sections) &&
      selectedContract.sections.map((section, index) => (
        <React.Fragment key={index}>
          {section.title && (
            <Heading as="h2" fontSize="lg" mt={4} textAlign="center">
              {section.title}
            </Heading>
          )}

          <ReactMarkdown>{processContent(section.content)}</ReactMarkdown>
        </React.Fragment>
      ))}
  </Box>
);
};

export default ContractContent;
