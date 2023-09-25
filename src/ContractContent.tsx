import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { Box, Heading } from "@chakra-ui/react";
import { db } from "./firebase-config";
import ContractPDF from "./ContractPDF";
import ContractSections from "./ContractSections";
import Button from "./Button";
import { Section } from "./utils";

interface ContractContentProps {
  fields: Array<{ label: string; value: string }>;
  selectedContractType: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  contractId?: string | undefined;
  contractStatus?: string | undefined;
  userEmail: string;
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
  user,
  contractId,
  contractStatus,
  userEmail,
}) => {
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractsData = await fetchContractsData(selectedContractType);
        setSelectedContract(contractsData || null);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchData();
  }, [selectedContractType]);

  const fetchContractsData = async (type: string) => {
    const contractsCollection = await getDocs(collection(db, "contracts"));
    const contractsData: ContractData[] = contractsCollection.docs.map(
      (doc) => doc.data() as ContractData
    );
    return contractsData.find((contract) => contract.contractType === type);
  };

  const sendValuesToFilledContracts = async () => {
    // const values = fields.map((field) => field.value);
    // let values = {};
    // fields.forEach((field) => {
    //   values = {...values, [field.label]: field.value};
    // })
    const values = fields.reduce(
      (result, field) => ({ ...result, [field.label]: field.value }),
      {}
    );
    const userId = user?.id || "Não cadastrado";
    const contractIdValue = contractId || "";
    const contractStatusValue = contractStatus || "";
    // const contractType = || "";

    try {
      await addValuesToFilledContracts(
        values,
        userId,
        contractIdValue,
        contractStatusValue,
        userEmail
      );
      alert("Upload realizado");
    } catch (error) {
      console.error("Error sending values to filledContracts:", error);
    }
  };

  const addValuesToFilledContracts = async (
    data: object,
    userId: string,
    contractId: string,
    contractStatus: string,
    userEmail: string
  ) => {
    const filledContractRef = collection(db, "filledContracts");
    await addDoc(filledContractRef, {
      data,
      timestamp: new Date(),
      userId,
      contractId,
      status: contractStatus,
      userEmail,
    });
    console.log("Values sent to filledContracts successfully!");
  };

  return (
    <Box p={4} textAlign="justify">
      <Heading fontSize={["3xl"]} mb={7} textAlign="center">
        {selectedContract?.header}
      </Heading>
      <ContractSections
        sections={selectedContract?.sections || []}
        fields={fields}
        selectedContract={selectedContract}
      />
      <Button onClick={sendValuesToFilledContracts}>Send Values</Button>
      {selectedContract && (
        <ContractPDF selectedContract={selectedContract} fields={fields} />
      )}
    </Box>
  );
};

export default ContractContent;
