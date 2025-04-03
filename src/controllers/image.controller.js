const path = require("path");
const fs = require("fs").promises;
const imageService = require("../services/image.service");
const templateService = require("../services/template.service");

// Banco de dados em memória simples para armazenar informações das imagens geradas
const generatedImages = [];

/**
 * Controlador para geração de imagens
 */
const imageController = {
  /**
   * Gera uma imagem a partir de um template
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async generateImage(req, res, next) {
    try {
      const { templateId, data, options } = req.body;

      // Validar parâmetros
      if (!templateId) {
        return res.status(400).json({
          success: false,
          message: "ID do template é obrigatório",
        });
      }

      if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Dados para o template são obrigatórios",
        });
      }

      // Obter o template
      let template;
      try {
        template = await templateService.getTemplateById(templateId);
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: `Template não encontrado: ${templateId}`,
        });
      }

      // Verificar se todos os placeholders exigidos foram fornecidos
      const missingPlaceholders = template.placeholders.filter(
        (placeholder) => !data[placeholder]
      );
      if (missingPlaceholders.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Dados ausentes para os placeholders: ${missingPlaceholders.join(
            ", "
          )}`,
        });
      }

      // Gerar a imagem
      const result = await imageService.generateImage(
        template.path,
        data,
        options
      );

      // Salvar informações da imagem gerada
      const imageInfo = {
        id: path.basename(result.fileName, path.extname(result.fileName)),
        templateId,
        fileName: result.fileName,
        url: result.url,
        dimensions: result.dimensions,
        format: result.format,
        timestamp: result.timestamp,
        data,
      };

      // Adicionar ao histórico (em um sistema real, seria salvo em banco de dados)
      generatedImages.unshift(imageInfo);

      // Limitar o tamanho do histórico para evitar consumo excessivo de memória
      if (generatedImages.length > 100) {
        generatedImages.pop();
      }

      res.status(201).json({
        success: true,
        message: "Imagem gerada com sucesso",
        data: imageInfo,
      });
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      next(error);
    }
  },

  /**
   * Obtém uma imagem pelo ID
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async getImageById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID da imagem não fornecido",
        });
      }

      // Buscar informações da imagem (em um sistema real, seria buscado do banco de dados)
      const imageInfo = generatedImages.find((img) => img.id === id);

      if (!imageInfo) {
        return res.status(404).json({
          success: false,
          message: "Imagem não encontrada",
        });
      }

      res.json({
        success: true,
        data: imageInfo,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Lista o histórico de imagens geradas
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async getGeneratedImages(req, res, next) {
    try {
      // Adicionar paginação básica
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {
        success: true,
        count: generatedImages.length,
        data: generatedImages.slice(startIndex, endIndex),
      };

      // Adicionar informações de paginação
      if (endIndex < generatedImages.length) {
        results.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit,
        };
      }

      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Exclui uma imagem
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async deleteImage(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID da imagem não fornecido",
        });
      }

      // Buscar informações da imagem
      const imageIndex = generatedImages.findIndex((img) => img.id === id);

      if (imageIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Imagem não encontrada",
        });
      }

      const imageInfo = generatedImages[imageIndex];

      // Excluir o arquivo
      await imageService.deleteImage(imageInfo.fileName);

      // Remover do histórico
      generatedImages.splice(imageIndex, 1);

      res.json({
        success: true,
        message: "Imagem excluída com sucesso",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = imageController;
