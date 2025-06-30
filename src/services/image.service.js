const fs = require("fs").promises;
const path = require("path");
const puppeteer = require("puppeteer");
const crypto = require("crypto");
const cheerio = require("cheerio");
const uploadService = require("./upload.service");

// Importar configurações conforme o ambiente
const config =
  process.env.NODE_ENV === "production"
    ? require("../config/production")
    : {
        puppeteer: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: "new",
        },
        storage: {
          imagesPath: process.env.STORAGE_PATH || "./src/public/images",
        },
      };

/**
 * Serviço para geração de imagens a partir de templates HTML
 */
class ImageService {
  /**
   * Extrai dimensões de um arquivo HTML
   * @param {string} htmlContent - Conteúdo HTML
   * @returns {Object} - Dimensões extraídas do corpo (width e height)
   */
  extractDimensionsFromHTML(htmlContent) {
    try {
      const $ = cheerio.load(htmlContent);
      const bodyStyles = $("body").attr("style");
      const widthMatch = bodyStyles && bodyStyles.match(/width\s*:\s*(\d+)px/);
      const heightMatch =
        bodyStyles && bodyStyles.match(/height\s*:\s*(\d+)px/);

      // Extrair do CSS interno se não encontrar no estilo inline
      if (!widthMatch || !heightMatch) {
        const styleTag = $("style").html();
        if (styleTag) {
          const bodyStyleMatch = styleTag.match(/body\s*{[^}]*}/);
          if (bodyStyleMatch) {
            const bodyCSS = bodyStyleMatch[0];
            const widthCSSMatch = bodyCSS.match(/width\s*:\s*(\d+)px/);
            const heightCSSMatch = bodyCSS.match(/height\s*:\s*(\d+)px/);

            if (widthCSSMatch && heightCSSMatch) {
              return {
                width: parseInt(widthCSSMatch[1], 10),
                height: parseInt(heightCSSMatch[1], 10),
              };
            }
          }
        }
      }

      return {
        width: widthMatch ? parseInt(widthMatch[1], 10) : 1200,
        height: heightMatch ? parseInt(heightMatch[1], 10) : 630,
      };
    } catch (error) {
      console.warn("Erro ao extrair dimensões do HTML:", error);
      // Retornar dimensões padrão
      return { width: 1200, height: 630 };
    }
  }

  /**
   * Gera uma imagem a partir de um template HTML e dados
   * @param {string} templatePath - Caminho para o arquivo de template
   * @param {Object} data - Dados para preencher o template
   * @param {Object} options - Opções de renderização
   * @returns {Promise<Object>} - Objeto com informações da imagem gerada
   */
  async generateImage(templatePath, data, options = {}) {
    try {
      // Ler o conteúdo do template
      let templateContent = await fs.readFile(templatePath, "utf-8");

      // Extrair dimensões do template
      const templateDimensions =
        this.extractDimensionsFromHTML(templateContent);

      // Configurações padrão
      const defaultOptions = {
        width: templateDimensions.width || 1200,
        height: templateDimensions.height || 630,
        quality: 90,
        format: "png",
        fullPage: false,
        delay: 0,
      };

      // Mesclar opções padrão com as fornecidas
      const renderOptions = { ...defaultOptions, ...options };

      // Substituir placeholders com os dados fornecidos
      for (const [key, value] of Object.entries(data)) {
        const placeholder = `{{${key}}}`;
        templateContent = templateContent.replace(
          new RegExp(placeholder, "g"),
          value
        );
      }

      // Gerar nome de arquivo único
      const hash = crypto.randomBytes(16).toString("hex");
      const fileName = `${hash}.${renderOptions.format}`;
      const outputPath = path.join(config.storage.imagesPath, fileName);

      // Iniciar o navegador com as configurações do ambiente
      const browser = await puppeteer.launch({
        headless: config.puppeteer.headless,
        args: config.puppeteer.args,
        defaultViewport: {
          width: renderOptions.width,
          height: renderOptions.height,
        },
      });

      // Criar nova página
      const page = await browser.newPage();

      // Configurar tamanho da viewport
      await page.setViewport({
        width: renderOptions.width,
        height: renderOptions.height,
      });

      // Carregar o conteúdo HTML
      await page.setContent(templateContent, { waitUntil: "networkidle0" });

      // Aguardar se houver um delay especificado
      if (renderOptions.delay > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, renderOptions.delay)
        );
      }

      // Capturar a screenshot
      await page.screenshot({
        path: outputPath,
        quality:
          renderOptions.format.toLowerCase() === "jpeg" ||
          renderOptions.format.toLowerCase() === "jpg"
            ? renderOptions.quality
            : undefined,
        fullPage: renderOptions.fullPage,
        type: renderOptions.format,
      });

      // Fechar o navegador
      await browser.close();

      // Preparar resultado inicial
      const result = {
        success: true,
        fileName,
        filePath: outputPath,
        url: `/images/${fileName}`,
        dimensions: {
          width: renderOptions.width,
          height: renderOptions.height,
        },
        format: renderOptions.format,
        timestamp: new Date().toISOString(),
      };

      // Upload para SNDT se habilitado
      if (uploadService.isEnabled()) {
        try {
          console.log("🚀 Iniciando upload para SNDT...");
          const uploadResult = await uploadService.uploadToSNDT(
            outputPath,
            fileName
          );

          // Substituir URL local pela URL do SNDT
          result.url = uploadResult.url;
          result.uploaded_to_sndt = true;
          result.sndt_info = {
            url: uploadResult.url,
            size: uploadResult.size,
            type: uploadResult.type,
            uploaded_at: uploadResult.uploaded_at,
          };

          console.log(`✅ Upload para SNDT concluído: ${uploadResult.url}`);
        } catch (uploadError) {
          console.error("❌ Falha no upload para SNDT:", uploadError.message);
          // Continua com URL local em caso de falha
          result.uploaded_to_sndt = false;
          result.upload_error = uploadError.message;
        }
      } else {
        result.uploaded_to_sndt = false;
        console.log("ℹ️ Upload para SNDT desabilitado");
      }

      return result;
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      throw new Error(`Falha ao gerar imagem: ${error.message}`);
    }
  }

  /**
   * Exclui uma imagem pelo nome do arquivo
   * @param {string} fileName - Nome do arquivo a ser excluído
   * @returns {Promise<boolean>} - True se excluído com sucesso
   */
  async deleteImage(fileName) {
    try {
      const filePath = path.join(config.storage.imagesPath, fileName);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
      throw new Error(`Falha ao excluir imagem: ${error.message}`);
    }
  }
}

module.exports = new ImageService();
