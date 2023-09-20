import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Section } from "./utils";

interface ContractPDFProps {
  selectedContract: ContractData | null;
  fields: Array<{ label: string; value: string }>;
}

interface ContractData {
  contractType: string;
  header: string;
  sections: Section[];
  inputFields: Array<{ label: string; value: string }>;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 12,
  },
});

const ContractPDF: React.FC<ContractPDFProps> = ({
  selectedContract,
  fields,
}) => {
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

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{selectedContract?.header}</Text>
          </View>
          {selectedContract?.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.title && (
                <Text style={styles.sectionTitle}>{section.title}</Text>
              )}
              <Text style={styles.sectionContent}>
                {processContent(section.content)}
              </Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ContractPDF;
