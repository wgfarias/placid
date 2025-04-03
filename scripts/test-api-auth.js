/**
 * Script para testar a autenticação da API
 * Executa requisições com e sem a chave de API para verificar o comportamento
 */

const fetch = require("node-fetch");
require("dotenv").config();

// Configurações
const API_URL = `http://localhost:${
  process.env.PORT || 4000
}/api/images/generate`;
const API_KEY = process.env.API_KEY;

// Dados de teste
const testData = {
  templateId: "modelo_post",
  data: {
    title: "Teste de Autenticação",
    subtitle: "Verificação de API Key",
  },
  options: {
    format: "png",
    quality: 80,
  },
};

// Cores para saída no console
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

// Função para testar a API
async function testApiAuth() {
  console.log(
    `${colors.blue}=== TESTE DE AUTENTICAÇÃO DA API ===${colors.reset}`
  );
  console.log(`${colors.blue}URL da API: ${API_URL}${colors.reset}`);
  console.log(`${colors.blue}API Key configurada: ${API_KEY}${colors.reset}`);
  console.log("");

  // Teste 1: Sem API Key
  console.log(`${colors.yellow}Teste 1: Requisição sem API Key${colors.reset}`);
  try {
    const response1 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const data1 = await response1.json();
    console.log(`Status: ${response1.status}`);
    console.log("Resposta:", data1);

    if (response1.status === 401) {
      console.log(
        `${colors.green}✓ Teste 1 passou: API negou acesso sem API Key${colors.reset}`
      );
    } else {
      console.log(
        `${colors.red}✗ Teste 1 falhou: Era esperado status 401${colors.reset}`
      );
    }
  } catch (error) {
    console.log(
      `${colors.red}✗ Erro ao executar o Teste 1: ${error.message}${colors.reset}`
    );
  }

  console.log("");

  // Teste 2: Com API Key incorreta
  console.log(
    `${colors.yellow}Teste 2: Requisição com API Key incorreta${colors.reset}`
  );
  try {
    const response2 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "chave_incorreta",
      },
      body: JSON.stringify(testData),
    });

    const data2 = await response2.json();
    console.log(`Status: ${response2.status}`);
    console.log("Resposta:", data2);

    if (response2.status === 403) {
      console.log(
        `${colors.green}✓ Teste 2 passou: API negou acesso com API Key incorreta${colors.reset}`
      );
    } else {
      console.log(
        `${colors.red}✗ Teste 2 falhou: Era esperado status 403${colors.reset}`
      );
    }
  } catch (error) {
    console.log(
      `${colors.red}✗ Erro ao executar o Teste 2: ${error.message}${colors.reset}`
    );
  }

  console.log("");

  // Teste 3: Com API Key correta
  console.log(
    `${colors.yellow}Teste 3: Requisição com API Key correta${colors.reset}`
  );
  try {
    const response3 = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(testData),
    });

    const data3 = await response3.json();
    console.log(`Status: ${response3.status}`);
    console.log("Resposta:", data3);

    if (response3.status === 201 || response3.status === 200) {
      console.log(
        `${colors.green}✓ Teste 3 passou: API aceitou a requisição com API Key correta${colors.reset}`
      );
    } else {
      console.log(
        `${colors.red}✗ Teste 3 falhou: Era esperado status 201 ou 200${colors.reset}`
      );
    }
  } catch (error) {
    console.log(
      `${colors.red}✗ Erro ao executar o Teste 3: ${error.message}${colors.reset}`
    );
  }
}

// Executar o teste
testApiAuth().catch((error) => {
  console.error(`${colors.red}Erro fatal: ${error.message}${colors.reset}`);
});
