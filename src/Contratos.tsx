import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import "./Contratos.scss";

const Contratos: React.FC = () => {
  const [fields, setFields] = useState([
    { label: "Nome do Proprietário", value: "" },
    { label: "Endereço do Proprietário", value: "" },
    { label: "Nome do Locatário", value: "" },
    { label: "Endereço do Locatário", value: "" },
    { label: "Endereço do Imóvel", value: "" },
    { label: "Descrição do Imóvel", value: "" },
    { label: "Data de Início", value: "" },
    { label: "Duração do Contrato", value: "" },
    { label: "Valor do Aluguel", value: "" },
    { label: "Meio de Pagamento", value: "" },
    { label: "Informações da Conta Bancária", value: "" },
    { label: "Valor da Caução", value: "" },
    { label: "Prazo de Devolução da Caução", value: "" },
    { label: "Prazo de Aviso Prévio", value: "" },
    { label: "País/Estado", value: "" },
    { label: "Data da Assinatura", value: "" },
  ]);

  const handleFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  const renderInputs = () => {
    return fields.map((field, index) => (
      <input
        key={index}
        type="text"
        value={field.value}
        onChange={(event) => handleFieldChange(index, event)}
        placeholder={field.label}
      />
    ));
  };

  return (
    <Box className="custom-container">
      {renderInputs()}
      <Box as="body">
        <h1>CONTRATO DE ALUGUEL</h1>

        <Text fontSize="xl">
          Este Contrato de Aluguel ("Contrato") é celebrado entre o
          proprietário, {fields[0].value}, residente em {fields[1].value},
          adiante denominado "Proprietário", e o locatário, {fields[2].value},
          residente em {fields[3].value}, adiante denominado "Locatário".
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          1. OBJETO DO CONTRATO
        </Heading>

        <Text>
          O Proprietário concorda em alugar a propriedade localizada em{" "}
          {fields[4].value} ("Imóvel"), que consiste em {fields[5].value} para o
          Locatário, com a finalidade exclusiva de uso residencial.
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          2. PRAZO DO CONTRATO
        </Heading>

        <Text>
          O contrato de aluguel terá início em {fields[6].value} e terá duração
          de {fields[7].value} meses, a contar da data de início.
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          3. ALUGUEL
        </Heading>

        <Text>
          O Locatário concorda em pagar ao Proprietário um aluguel mensal de{" "}
          {fields[8].value} até o quinto dia útil de cada mês. O pagamento
          deverá ser feito por meio de {fields[9].value}, na conta bancária do
          Proprietário com os detalhes a seguir: {fields[10].value}.
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          4. CAUÇÃO
        </Heading>

        <Text>
          O Locatário concorda em pagar uma caução no valor de{" "}
          {fields[11].value} no ato da assinatura deste contrato. A caução será
          utilizada para cobrir eventuais danos ou despesas devidas pelo
          Locatário ao Imóvel durante o período de locação. Caso não haja nenhum
          dano ou despesa pendente, a caução será devolvida ao Locatário no
          prazo máximo de {fields[12].value} após o término do contrato.
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          5. RESPONSABILIDADES DO LOCATÁRIO
        </Heading>

        <UnorderedList mt={2} ml={4}>
          <ListItem>
            Zelar pelo Imóvel e mantê-lo em bom estado de conservação;
          </ListItem>
          <ListItem>
            Pagar todas as contas e despesas relacionadas ao consumo de água,
            eletricidade, gás e outros serviços públicos;
          </ListItem>
          <ListItem>
            Informar ao Proprietário imediatamente sobre quaisquer danos ou
            problemas no Imóvel;
          </ListItem>
          <ListItem>
            Não realizar qualquer modificação estrutural no Imóvel sem o
            consentimento prévio por escrito do Proprietário;
          </ListItem>
          <ListItem>
            Não sublocar, ceder ou transferir o Imóvel para terceiros sem o
            consentimento prévio por escrito do Proprietário.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" fontSize="lg" mt={4}>
          6. RESPONSABILIDADES DO PROPRIETÁRIO
        </Heading>

        <UnorderedList mt={2} ml={4}>
          <ListItem>
            Manter o Imóvel em bom estado de conservação, realizando as devidas
            manutenções necessárias;
          </ListItem>
          <ListItem>
            Respeitar o direito do Locatário à privacidade e tranquilidade
            durante o período de locação;
          </ListItem>
          <ListItem>
            Informar ao Locatário sobre qualquer alteração relevante nas
            condições do Imóvel com antecedência.
          </ListItem>
        </UnorderedList>

        <Heading as="h2" fontSize="lg" mt={4}>
          7. RESCISÃO ANTICIPADA
        </Heading>

        <Text>
          Em caso de rescisão antecipada deste contrato por qualquer uma das
          partes, deverá ser fornecido um aviso prévio por escrito com
          antecedência mínima de {fields[13].value} dias.
        </Text>

        <Heading as="h2" fontSize="lg" mt={4}>
          8. DISPOSIÇÕES GERAIS
        </Heading>

        <Text>
          a) Este contrato representa o acordo integral entre as partes e
          prevalece sobre qualquer acordo verbal ou escrito anterior;
          <br />
          b) Qualquer modificação a este contrato deverá ser feita por escrito e
          assinada por ambas as partes;
          <br />
          c) Este contrato é regido pelas leis do {fields[14].value};
          <br />
          d) Caso qualquer disposição deste contrato seja considerada inválida
          ou inexequível, as demais disposições permanecerão em pleno vigor e
          efeito.
        </Text>

        <Text as="p" mt={4}>
          As partes declaram que leram e compreenderam todas as cláusulas deste
          Contrato de Aluguel e concordam em cumpri-las em sua totalidade.
        </Text>

        <Text>
          {fields[0].value}
          <br />
          Proprietário
        </Text>

        <Text>
          {fields[2].value}
          <br />
          Locatário
        </Text>

        <Text>Data: {fields[15].value}</Text>

        <Link to="/">Voltar</Link>
      </Box>
    </Box>
  );
};

export default Contratos;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
// import "./Contratos.scss";

// interface Props {
//   fields: {
//     label: string;
//     value: string;
//   }[];
// }

// const Contrato: React.FC<Props> = ({ fields }) => {
//   return (
//     <Box className="custom-container">
//       <Box as="body">
//         <h1>CONTRATO DE ALUGUEL</h1>

//         <Text fontSize="xl">
//           Este Contrato de Aluguel ("Contrato") é celebrado entre o
//           proprietário, {fields[0].value}, residente em {fields[1].value},
//           adiante denominado "Proprietário", e o locatário, {fields[2].value},
//           residente em {fields[3].value}, adiante denominado "Locatário".
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           1. OBJETO DO CONTRATO
//         </Heading>

//         <Text>
//           O Proprietário concorda em alugar a propriedade localizada em{" "}
//           {fields[4].value} ("Imóvel"), que consiste em {fields[5].value} para o
//           Locatário, com a finalidade exclusiva de uso residencial.
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           2. PRAZO DO CONTRATO
//         </Heading>

//         <Text>
//           O contrato de aluguel terá início em {fields[6].value} e terá duração
//           de {fields[7].value} meses, a contar da data de início.
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           3. ALUGUEL
//         </Heading>

//         <Text>
//           O Locatário concorda em pagar ao Proprietário um aluguel mensal de{" "}
//           {fields[8].value} até o quinto dia útil de cada mês. O pagamento
//           deverá ser feito por meio de {fields[9].value}, na conta bancária do
//           Proprietário com os detalhes a seguir: {fields[10].value}.
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           4. CAUÇÃO
//         </Heading>

//         <Text>
//           O Locatário concorda em pagar uma caução no valor de{" "}
//           {fields[11].value} no ato da assinatura deste contrato. A caução será
//           utilizada para cobrir eventuais danos ou despesas devidas pelo
//           Locatário ao Imóvel durante o período de locação. Caso não haja nenhum
//           dano ou despesa pendente, a caução será devolvida ao Locatário no
//           prazo máximo de {fields[12].value} após o término do contrato.
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           5. RESPONSABILIDADES DO LOCATÁRIO
//         </Heading>

//         <UnorderedList mt={2} ml={4}>
//           <ListItem>
//             Zelar pelo Imóvel e mantê-lo em bom estado de conservação;
//           </ListItem>
//           <ListItem>
//             Pagar todas as contas e despesas relacionadas ao consumo de água,
//             eletricidade, gás e outros serviços públicos;
//           </ListItem>
//           <ListItem>
//             Informar ao Proprietário imediatamente sobre quaisquer danos ou
//             problemas no Imóvel;
//           </ListItem>
//           <ListItem>
//             Não realizar qualquer modificação estrutural no Imóvel sem o
//             consentimento prévio por escrito do Proprietário;
//           </ListItem>
//           <ListItem>
//             Não sublocar, ceder ou transferir o Imóvel para terceiros sem o
//             consentimento prévio por escrito do Proprietário.
//           </ListItem>
//         </UnorderedList>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           6. RESPONSABILIDADES DO PROPRIETÁRIO
//         </Heading>

//         <UnorderedList mt={2} ml={4}>
//           <ListItem>
//             Manter o Imóvel em bom estado de conservação, realizando as devidas
//             manutenções necessárias;
//           </ListItem>
//           <ListItem>
//             Respeitar o direito do Locatário à privacidade e tranquilidade
//             durante o período de locação;
//           </ListItem>
//           <ListItem>
//             Informar ao Locatário sobre qualquer alteração relevante nas
//             condições do Imóvel com antecedência.
//           </ListItem>
//         </UnorderedList>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           7. RESCISÃO ANTICIPADA
//         </Heading>

//         <Text>
//           Em caso de rescisão antecipada deste contrato por qualquer uma das
//           partes, deverá ser fornecido um aviso prévio por escrito com
//           antecedência mínima de {fields[13].value} dias.
//         </Text>

//         <Heading as="h2" fontSize="lg" mt={4}>
//           8. DISPOSIÇÕES GERAIS
//         </Heading>

//         <Text>
//           a) Este contrato representa o acordo integral entre as partes e
//           prevalece sobre qualquer acordo verbal ou escrito anterior;
//           <br />
//           b) Qualquer modificação a este contrato deverá ser feita por escrito e
//           assinada por ambas as partes;
//           <br />
//           c) Este contrato é regido pelas leis do {fields[14].value};
//           <br />
//           d) Caso qualquer disposição deste contrato seja considerada inválida
//           ou inexequível, as demais disposições permanecerão em pleno vigor e
//           efeito.
//         </Text>

//         <Text as="p" mt={4}>
//           As partes declaram que leram e compreenderam todas as cláusulas deste
//           Contrato de Aluguel e concordam em cumpri-las em sua totalidade.
//         </Text>

//         <Text>
//           {fields[0].value}
//           <br />
//           Proprietário
//         </Text>

//         <Text>
//           {fields[2].value}
//           <br />
//           Locatário
//         </Text>

//         <Text>Data: {fields[15].value}</Text>

//         <Link to="/">Voltar</Link>
//       </Box>
//     </Box>
//   );
// };

// export default Contrato;
