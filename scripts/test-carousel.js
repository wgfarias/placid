/**
 * Script para testar o endpoint de carrossel
 * Uso: node scripts/test-carousel.js
 */

const fs = require("fs").promises;
const path = require("path");
const http = require("http");

// Carrega variáveis de ambiente
require("dotenv").config();

// Define a porta do servidor
const PORT = process.env.PORT || 4000;

// Função principal
async function main() {
  try {
    // Carrega os dados de exemplo do carrossel
    const carouselData = await loadCarouselData();

    // Prepara a requisição
    const options = {
      hostname: "localhost",
      port: PORT,
      path: "/api/images/generate-carousel",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "placid_secret_key",
      },
    };

    // Envia a requisição
    console.log(`\x1b[33m🎠 Testando endpoint de carrossel...\x1b[0m`);
    console.log(`Slides: ${carouselData.slides.length}`);
    console.log("Enviando requisição...");

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);

          if (response.success) {
            console.log("\x1b[32m✅ Carrossel gerado com sucesso!\x1b[0m");
            console.log(`Carrossel ID: ${response.data.carouselId}`);
            console.log(`Total de slides: ${response.data.total}`);
            console.log(`Sucessos: ${response.data.successful}`);
            console.log(`Falhas: ${response.data.failed}`);
            console.log(`Timestamp: ${response.data.timestamp}`);

            console.log("\n\x1b[36m📋 URLs das imagens geradas:\x1b[0m");
            response.data.slides.forEach((slide, index) => {
              const imageUrl = slide.url.startsWith("http")
                ? slide.url
                : `http://localhost:${PORT}${slide.url}`;

              console.log(`  ${index + 1}. ${slide.templateId}: ${imageUrl}`);
              console.log(
                `     Dimensões: ${slide.dimensions.width}x${slide.dimensions.height}`
              );
              console.log(
                `     Upload SNDT: ${slide.uploaded_to_sndt ? "✅" : "❌"}`
              );

              if (slide.upload_error) {
                console.log(
                  `     \x1b[33m⚠️ Erro upload: ${slide.upload_error}\x1b[0m`
                );
              }
            });

            if (response.data.errors && response.data.errors.length > 0) {
              console.log("\n\x1b[31m❌ Erros encontrados:\x1b[0m");
              response.data.errors.forEach((error, index) => {
                console.log(
                  `  ${index + 1}. Slide ${error.slideIndex} (${
                    error.templateId
                  }): ${error.error}`
                );
              });
            }
          } else {
            console.error(
              `\x1b[31m❌ Erro ao gerar carrossel: ${response.message}\x1b[0m`
            );
            if (response.data && response.data.errors) {
              console.error("Detalhes dos erros:");
              response.data.errors.forEach((error, index) => {
                console.error(
                  `  ${index + 1}. Slide ${error.slideIndex}: ${error.error}`
                );
              });
            }
          }
        } catch (parseError) {
          console.error(
            `\x1b[31m❌ Erro ao processar resposta: ${parseError.message}\x1b[0m`
          );
          console.error("Resposta recebida:", data);
        }
      });
    });

    req.on("error", (error) => {
      console.error(`\x1b[31m❌ Erro na requisição: ${error.message}\x1b[0m`);
      console.log(
        `Verifique se o servidor está rodando em: http://localhost:${PORT}`
      );
    });

    req.write(JSON.stringify(carouselData));
    req.end();
  } catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  }
}

// Função para carregar dados do carrossel
async function loadCarouselData() {
  try {
    const carouselFile = path.join(__dirname, "../examples/carousel.json");
    const carouselData = await fs.readFile(carouselFile, "utf-8");
    return JSON.parse(carouselData);
  } catch (error) {
    console.error("❌ Erro ao carregar dados do carrossel:", error.message);
    console.log("Verifique se o arquivo examples/carousel.json existe.");
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}
