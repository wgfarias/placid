/**
 * Script para testar templates rapidamente
 * Uso: node scripts/test-template.js <nome-do-template>
 *
 * Exemplo: node scripts/test-template.js instagram
 */

const fs = require("fs").promises;
const path = require("path");
const http = require("http");

// Verifica argumentos
const templateId = process.argv[2];
if (!templateId) {
  console.error(
    "\x1b[31mErro: Forneça o nome do template como argumento.\x1b[0m"
  );
  console.log("Uso: node scripts/test-template.js <nome-do-template>");
  console.log("Templates disponíveis:");
  listTemplates();
  process.exit(1);
}

// Lista os templates disponíveis
async function listTemplates() {
  try {
    const templatesDir = path.join(__dirname, "../src/templates");
    const files = await fs.readdir(templatesDir);
    const htmlFiles = files.filter((file) => file.endsWith(".html"));

    htmlFiles.forEach((file) => {
      const name = path.basename(file, ".html");
      console.log(`- \x1b[36m${name}\x1b[0m`);
    });
  } catch (err) {
    console.error("Erro ao listar templates:", err);
  }
}

// Carrega o arquivo de exemplo correspondente ao template
async function loadExampleData(templateId) {
  try {
    const examplePath = path.join(__dirname, `../examples/${templateId}.json`);
    const data = await fs.readFile(examplePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(
        `\x1b[31mErro: Arquivo de exemplo para '${templateId}' não encontrado.\x1b[0m`
      );
      console.log(`Crie um arquivo de exemplo em: examples/${templateId}.json`);
    } else {
      console.error("Erro ao carregar exemplo:", err);
    }
    process.exit(1);
  }
}

// Função principal
async function main() {
  try {
    // Verifica se o template existe
    const templatePath = path.join(
      __dirname,
      `../src/templates/${templateId}.html`
    );
    try {
      await fs.access(templatePath);
    } catch (err) {
      console.error(
        `\x1b[31mErro: Template '${templateId}' não encontrado.\x1b[0m`
      );
      console.log("Templates disponíveis:");
      await listTemplates();
      process.exit(1);
    }

    // Carrega os dados de exemplo
    const requestData = await loadExampleData(templateId);

    // Prepara a requisição
    const options = {
      hostname: "localhost",
      port: 3000,
      path: "/api/images/generate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "placid_secret_key",
      },
    };

    // Envia a requisição
    console.log(`\x1b[33mTestando template: \x1b[36m${templateId}\x1b[0m`);
    console.log("Enviando requisição...");

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);

        if (response.success) {
          console.log("\x1b[32mImagem gerada com sucesso!\x1b[0m");
          console.log(
            `URL da imagem: http://localhost:3000${response.data.url}`
          );
          console.log(
            `Dimensões: ${response.data.dimensions.width}x${response.data.dimensions.height}`
          );
          console.log(`Formato: ${response.data.format}`);
          console.log(`Arquivo: ${response.data.fileName}`);
        } else {
          console.error(
            `\x1b[31mErro ao gerar imagem: ${response.message}\x1b[0m`
          );
          if (response.error) {
            console.error(`Detalhes: ${response.error}`);
          }
        }
      });
    });

    req.on("error", (error) => {
      console.error(`\x1b[31mErro na requisição: ${error.message}\x1b[0m`);
      console.log(
        "Verifique se o servidor está rodando em: http://localhost:3000"
      );
    });

    req.write(JSON.stringify(requestData));
    req.end();
  } catch (err) {
    console.error("Erro:", err);
  }
}

main();
