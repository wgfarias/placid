/**
 * Script para gerar exemplos renderizados de todos os templates
 * Isso vai criar uma imagem para cada template usando os dados de exemplo
 */

const fs = require("fs").promises;
const path = require("path");
const imageService = require("../src/services/image.service");

// Diretórios principais
const templatesDir = path.join(__dirname, "../src/templates");
const examplesDir = path.join(__dirname, "../examples");
const outputDir = path.join(__dirname, "../rendered_examples");

/**
 * Função para listar todos os templates disponíveis
 * @returns {Promise<Array>} Lista de templates
 */
async function listTemplates() {
  try {
    const files = await fs.readdir(templatesDir);
    return files
      .filter(
        (file) =>
          file.endsWith(".html") &&
          file !== "basic.html" &&
          file !== "template-de-teste.html"
      )
      .map((file) => ({
        id: path.basename(file, ".html"),
        path: path.join(templatesDir, file),
      }));
  } catch (error) {
    console.error("Erro ao listar templates:", error);
    return [];
  }
}

/**
 * Função para carregar dados de exemplo
 * @param {string} templateId - ID do template
 * @returns {Promise<Object>} Dados de exemplo
 */
async function loadExampleData(templateId) {
  try {
    const exampleFile = path.join(examplesDir, `${templateId}.json`);
    const exampleData = await fs.readFile(exampleFile, "utf-8");
    return JSON.parse(exampleData);
  } catch (error) {
    console.error(`Erro ao carregar exemplo para ${templateId}:`, error);
    return null;
  }
}

/**
 * Função principal para gerar exemplos
 */
async function generateExamples() {
  try {
    console.log("🎨 Gerando imagens de exemplo para todos os templates...");

    // Criar o diretório de saída se não existir
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (e) {
      // Ignorar se já existir
    }

    // Obter a lista de templates
    const templates = await listTemplates();
    console.log(`📋 Encontrados ${templates.length} templates`);

    // Para cada template, gerar um exemplo
    for (const template of templates) {
      console.log(`\n🔄 Processando template: ${template.id}`);

      // Carregar dados de exemplo
      const exampleData = await loadExampleData(template.id);
      if (!exampleData) {
        console.log(
          `⚠️ Dados de exemplo não encontrados para ${template.id}, pulando...`
        );
        continue;
      }

      // Gerar a imagem
      console.log(`🖼️ Gerando imagem para: ${template.id}`);
      try {
        const result = await imageService.generateImage(
          template.path,
          exampleData,
          {
            format: "png",
            quality: 100,
          }
        );

        // Copiar para o diretório de exemplos
        const outputFileName = `${template.id}_example.png`;
        const outputPath = path.join(outputDir, outputFileName);
        await fs.copyFile(result.filePath, outputPath);

        console.log(`✅ Imagem gerada em: ${outputPath}`);
        console.log(
          `📊 Dimensões: ${result.dimensions.width}x${result.dimensions.height}`
        );
      } catch (error) {
        console.error(`❌ Erro ao gerar imagem para ${template.id}:`, error);
      }
    }

    console.log("\n🎉 Processo concluído!");
    console.log(`📁 Os exemplos foram salvos em: ${outputDir}`);
  } catch (error) {
    console.error("❌ Erro durante a geração de exemplos:", error);
  }
}

// Executar a função principal
generateExamples().catch(console.error);
