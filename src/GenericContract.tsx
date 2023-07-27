// GenericContract.tsx
import React from "react";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

interface GenericContractProps {
  contractType: string;
  fields: Array<{ label: string; value: string }>;
}

const GenericContract: React.FC<GenericContractProps> = ({ fields }) => {
  const renderLabel = (label: string, value: string) => {
    return value !== "" ? value : <i>{label}</i>;
  };

  return (
    <Box>
      <h1>CONTRATO DE ALUGUEL</h1>

      <Text fontSize="xl">
        Este Contrato de Aluguel ("Contrato") é celebrado entre o proprietário,{" "}
        {renderLabel(fields[0].label, fields[0].value)}, residente em{" "}
        {renderLabel(fields[1].label, fields[1].value)}, adiante denominado
        "Proprietário", e o locatário,{" "}
        {renderLabel(fields[2].label, fields[2].value)}, residente em{" "}
        {renderLabel(fields[3].label, fields[3].value)}, adiante denominado
        "Locatário".
      </Text>

      <Heading as="h2" fontSize="lg" mt={4}>
        1. OBJETO DO CONTRATO
      </Heading>

      <Text>
        O Proprietário concorda em alugar a propriedade localizada em{" "}
        {renderLabel(fields[4].label, fields[4].value)} ("Imóvel"), que consiste
        em {renderLabel(fields[5].label, fields[5].value)} para o Locatário, com
        a finalidade exclusiva de uso residencial.
      </Text>

      <Heading as="h2" fontSize="lg" mt={4}>
        2. PRAZO DO CONTRATO
      </Heading>

      <Text>
        O contrato de aluguel terá início em{" "}
        {renderLabel(fields[6].label, fields[6].value)} e terá duração de{" "}
        {renderLabel(fields[7].label, fields[7].value)} meses, a contar da data
        de início.
      </Text>

      <Heading as="h2" fontSize="lg" mt={4}>
        3. ALUGUEL
      </Heading>

      <Text>
        O Locatário concorda em pagar ao Proprietário um aluguel mensal de{" "}
        {renderLabel(fields[8].label, fields[8].value)} até o quinto dia útil de
        cada mês. O pagamento deverá ser feito por meio de{" "}
        {renderLabel(fields[9].label, fields[9].value)}, na conta bancária do
        Proprietário com os detalhes a seguir:{" "}
        {renderLabel(fields[10].label, fields[10].value)}.
      </Text>

      <Heading as="h2" fontSize="lg" mt={4}>
        4. CAUÇÃO
      </Heading>

      <Text>
        O Locatário concorda em pagar uma caução no valor de{" "}
        {renderLabel(fields[11].label, fields[11].value)} no ato11 da assinatura
        deste contrato. A caução será utilizada para cobrir eventuais danos ou
        despesas devidas pelo Locatário ao Imóvel durante o período de locação.
        Caso não haja nenhum dano ou despesa pendente, a caução será devolvida
        ao Locatário no prazo máximo de{" "}
        {renderLabel(fields[12].label, fields[12].value)} após o término do
        contrato.
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
          Respeitar o direito do Locatário à privacidade e tranquilidade durante
          o período de locação;
        </ListItem>
        <ListItem>
          Informar ao Locatário sobre qualquer alteração relevante nas condições
          do Imóvel com antecedência.
        </ListItem>
      </UnorderedList>

      <Heading as="h2" fontSize="lg" mt={4}>
        7. RESCISÃO ANTICIPADA
      </Heading>

      <Text>
        Em caso de rescisão antecipada deste contrato por qualquer uma das
        partes, deverá ser fornecido um aviso prévio por escrito com
        antecedência mínima de {renderLabel(fields[13].label, fields[13].value)}{" "}
        dias.
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
        c) Este contrato é regido pelas leis do{" "}
        {renderLabel(fields[14].label, fields[14].value)};
        <br />
        d) Caso qualquer disposição deste contrato seja considerada inválida ou
        inexequível, as demais disposições permanecerão em pleno vigor e efeito.
      </Text>

      <Text as="p" mt={4}>
        As partes declaram que leram e compreenderam todas as cláusulas deste
        Contrato de Aluguel e concordam em cumpri-las em sua totalidade.
      </Text>

      <Text>
        {renderLabel(fields[0].label, fields[0].value)}
        <br />
        Proprietário
      </Text>

      <Text>
        {renderLabel(fields[2].label, fields[2].value)}
        <br />
        Locatário
      </Text>

      <Text>Data: {renderLabel(fields[15].label, fields[15].value)}</Text>
    </Box>
  );
};

export default GenericContract;
