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

  /**
   * Gera múltiplas imagens em formato carrossel
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async generateCarousel(req, res, next) {
    try {
      const { slides, options } = req.body;

      // Validar parâmetros obrigatórios
      if (!slides || !Array.isArray(slides) || slides.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Array 'slides' é obrigatório e deve conter pelo menos 1 item",
        });
      }

      // Validar limite de slides
      if (slides.length > 10) {
        return res.status(400).json({
          success: false,
          message: "Máximo de 10 slides por carrossel",
        });
      }

      // Validar estrutura de cada slide
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (!slide.templateId) {
          return res.status(400).json({
            success: false,
            message: `Slide ${i + 1}: templateId é obrigatório`,
          });
        }
        if (!slide.data || Object.keys(slide.data).length === 0) {
          return res.status(400).json({
            success: false,
            message: `Slide ${i + 1}: dados são obrigatórios`,
          });
        }
      }

      // Gerar carouselId único
      const carouselId =
        options?.carouselId ||
        `carousel_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

      console.log(
        `🎠 Iniciando geração do carrossel ${carouselId} com ${slides.length} slides...`
      );

      // Array para armazenar resultados
      const results = [];
      const errors = [];

      // Processar cada slide sequencialmente
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const slideNumber = i + 1;

        try {
          console.log(
            `🔄 Processando slide ${slideNumber}/${slides.length} (template: ${slide.templateId})...`
          );

          // Obter o template
          let template;
          try {
            template = await templateService.getTemplateById(slide.templateId);
          } catch (error) {
            throw new Error(`Template '${slide.templateId}' não encontrado`);
          }

          // Verificar se todos os placeholders exigidos foram fornecidos
          const missingPlaceholders = template.placeholders.filter(
            (placeholder) => !slide.data[placeholder]
          );
          if (missingPlaceholders.length > 0) {
            throw new Error(
              `Dados ausentes para os placeholders: ${missingPlaceholders.join(
                ", "
              )}`
            );
          }

          // Configurar opções específicas do slide
          const slideOptions = {
            ...options,
            prefix: `${carouselId}_slide_${slideNumber}_`,
          };

          // Gerar a imagem
          const result = await imageService.generateImage(
            template.path,
            slide.data,
            slideOptions
          );

          // Preparar informações do slide
          const slideInfo = {
            slideIndex: slideNumber,
            templateId: slide.templateId,
            id: path.basename(result.fileName, path.extname(result.fileName)),
            fileName: result.fileName,
            url: result.url,
            dimensions: result.dimensions,
            format: result.format,
            timestamp: result.timestamp,
            uploaded_to_sndt: result.uploaded_to_sndt || false,
            data: slide.data,
          };

          // Adicionar informações de upload se disponível
          if (result.sndt_info) {
            slideInfo.sndt_info = result.sndt_info;
          }
          if (result.upload_error) {
            slideInfo.upload_error = result.upload_error;
          }

          results.push(slideInfo);

          // Adicionar ao histórico individual
          generatedImages.unshift(slideInfo);

          console.log(
            `✅ Slide ${slideNumber} processado com sucesso: ${result.url}`
          );
        } catch (slideError) {
          const errorInfo = {
            slideIndex: slideNumber,
            templateId: slide.templateId,
            error: slideError.message,
            timestamp: new Date().toISOString(),
          };

          errors.push(errorInfo);
          console.error(`❌ Erro no slide ${slideNumber}:`, slideError.message);
        }
      }

      // Limitar o tamanho do histórico
      if (generatedImages.length > 100) {
        generatedImages.splice(100);
      }

      // Determinar status da resposta
      const hasErrors = errors.length > 0;
      const hasSuccess = results.length > 0;

      if (!hasSuccess) {
        return res.status(500).json({
          success: false,
          message: "Falha ao gerar todas as imagens do carrossel",
          data: {
            carouselId,
            slides: [],
            errors,
            total: 0,
            successful: 0,
            failed: errors.length,
            timestamp: new Date().toISOString(),
          },
        });
      }

      // Resposta de sucesso (mesmo com alguns erros)
      const responseData = {
        carouselId,
        slides: results,
        total: slides.length,
        successful: results.length,
        failed: errors.length,
        timestamp: new Date().toISOString(),
      };

      if (hasErrors) {
        responseData.errors = errors;
      }

      const statusCode = hasErrors ? 207 : 201; // 207 = Multi-Status (sucesso parcial)
      const message = hasErrors
        ? `Carrossel gerado com ${results.length} sucessos e ${errors.length} erros`
        : `Carrossel gerado com sucesso - ${results.length} imagens`;

      console.log(
        `🎉 Carrossel ${carouselId} finalizado: ${results.length}/${slides.length} imagens geradas`
      );

      res.status(statusCode).json({
        success: true,
        message,
        data: responseData,
      });
    } catch (error) {
      console.error("Erro ao gerar carrossel:", error);
      next(error);
    }
  },
};

module.exports = imageController;
