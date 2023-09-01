export const contractsData = {
  contracts:  [
    {
      "contractType": "Aluguel",
      "header": "CONTRATO DE ALUGUEL",
      "sections": [
        {
          "title": null,
          "content": "Este Contrato de Aluguel (\"Contrato\") é celebrado entre o proprietário, {inputFields[0].value}, residente em {inputFields[1].value}, adiante denominado \"Proprietário\", e o locatário, {inputFields[2].value}, residente em {inputFields[3].value}, adiante denominado \"Locatário\"."
        },
        {
          "title": "1. OBJETO DO CONTRATO",
          "content": "O Proprietário concorda em alugar a propriedade localizada em {inputFields[4].value} (\"Imóvel\"), que consiste em {inputFields[5].value} para o Locatário, com a finalidade exclusiva de uso residencial."
        },
        {
          "title": "2. PRAZO DO CONTRATO",
          "content": "O contrato de aluguel terá início em {inputFields[6].value} e terá duração de {inputFields[7].value} meses, a contar da data de início."
        },
        {
          "title": "3. ALUGUEL",
          "content": "O Locatário concorda em pagar ao Proprietário um aluguel mensal de {inputFields[8].value} até o quinto dia útil de cada mês. O pagamento deverá ser feito por meio de {inputFields[9].value}, na conta bancária do Proprietário com os detalhes a seguir: {inputFields[10].value}."
        },
        {
          "title": "4. CAUÇÃO",
          "content": "O Locatário concorda em pagar uma caução no valor de {inputFields[11].value} no ato da assinatura deste contrato. A caução será utilizada para cobrir eventuais danos ou despesas devidas pelo Locatário ao Imóvel durante o período de locação. Caso não haja nenhum dano ou despesa pendente, a caução será devolvida ao Locatário no prazo máximo de {inputFields[12].value} após o término do contrato."
        },
        {
          "title": "5. RESPONSABILIDADES DO LOCATÁRIO",
          "content": "O Locatário concorda em: \n\n- Zelar pelo Imóvel e mantê-lo em bom estado de conservação;\n- Pagar todas as contas e despesas relacionadas ao consumo de água, eletricidade, gás e outros serviços públicos;\n- Informar ao Proprietário imediatamente sobre quaisquer danos ou problemas no Imóvel;\n- Não realizar qualquer modificação estrutural no Imóvel sem o consentimento prévio por escrito do Proprietário;\n- Não sublocar, ceder ou transferir o Imóvel para terceiros sem o consentimento prévio por escrito do Proprietário."
        },
        {
          "title": "6. RESPONSABILIDADES DO PROPRIETÁRIO",
          "content": "O Proprietário concorda em: \n\n- Manter o Imóvel em bom estado de conservação, realizando as devidas manutenções necessárias;\n- Respeitar o direito do Locatário à privacidade e tranquilidade durante o período de locação;\n- Informar ao Locatário sobre qualquer alteração relevante nas condições do Imóvel com antecedência."
        },
        {
          "title": "7. RESCISÃO ANTICIPADA",
          "content": "Em caso de rescisão antecipada deste contrato por qualquer uma das partes, deverá ser fornecido um aviso prévio por escrito com antecedência mínima de {inputFields[13].value} dias."
        },
        {
          "title": "8. DISPOSIÇÕES GERAIS",
          "content": "a) Este contrato representa o acordo integral entre as partes e prevalece sobre qualquer acordo verbal ou escrito anterior;\n\nb) Qualquer modificação a este contrato deverá ser feita por escrito e assinada por ambas as partes;\n\nc) Este contrato é regido pelas leis do {inputFields[14].value};\n\nd) Caso qualquer disposição deste contrato seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito."
        }
      ],
      "inputFields": [
        { "label": "Nome do Proprietário", "value": "" },
        { "label": "Endereço do Proprietário", "value": "" },
        { "label": "Nome do Locatário", "value": "" },
        { "label": "Endereço do Locatário", "value": "" },
        { "label": "Endereço do Imóvel", "value": "" },
        { "label": "Descrição do Imóvel", "value": "" },
        { "label": "Data de Início", "value": "" },
        { "label": "Duração do Contrato", "value": "" },
        { "label": "Valor do Aluguel", "value": "" },
        { "label": "Meio de Pagamento", "value": "" },
        { "label": "Informações da Conta Bancária", "value": "" },
        { "label": "Valor da Caução", "value": "" },
        { "label": "Prazo de Devolução da Caução", "value": "" },
        { "label": "Prazo de Aviso Prévio", "value": "" },
        { "label": "País/Estado", "value": "" },
        { "label": "Data da Assinatura", "value": "" }
      ]
    },
    {
      "contractType": "Venda",
      "header": "CONTRATO DE COMPRA",
      "sections": [
        {
          "title": null,
          "content": "Este Contrato de Compra (\"Contrato\") é celebrado entre o vendedor, {inputFields[0].value}, residente em {inputFields[1].value}, adiante denominado \"Vendedor\", e o comprador, {inputFields[2].value}, residente em {inputFields[3].value}, adiante denominado \"Comprador\"."
        },
        {
          "title": "8. DISPOSIÇÕES GERAIS",
          "content": "a) Este contrato representa o acordo integral entre as partes e prevalece sobre qualquer acordo verbal ou escrito anterior;\n\nb) Qualquer modificação a este contrato deverá ser feita por escrito e assinada por ambas as partes;\n\nc) Este contrato é regido pelas leis do {inputFields[4].value};\n\nd) Caso qualquer disposição deste contrato seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito."
        }
      ],
      "inputFields": [
        { "label": "Nome do Vendedor", "value": "" },
        { "label": "Endereço do Vendedor", "value": "" },
        { "label": "Nome do Comprador", "value": "" },
        { "label": "Endereço do Comprador", "value": "" },
        { "label": "País/Estado", "value": "" }
      ]
    }
  ]
}