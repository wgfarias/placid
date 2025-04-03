const templateService = require("../services/template.service");

/**
 * Controlador para gerenciar templates
 */
const templateController = {
  /**
   * Obtém todos os templates
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async getAllTemplates(req, res, next) {
    try {
      const templates = await templateService.getAllTemplates();

      res.json({
        success: true,
        count: templates.length,
        data: templates,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtém um template pelo ID
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async getTemplateById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID do template não fornecido",
        });
      }

      const template = await templateService.getTemplateById(id);

      res.json({
        success: true,
        data: template,
      });
    } catch (error) {
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  },

  /**
   * Cria um novo template
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async createTemplate(req, res, next) {
    try {
      const { name, content } = req.body;

      if (!name || !content) {
        return res.status(400).json({
          success: false,
          message: "Nome e conteúdo do template são obrigatórios",
        });
      }

      const template = await templateService.createTemplate(name, content);

      res.status(201).json({
        success: true,
        message: "Template criado com sucesso",
        data: template,
      });
    } catch (error) {
      if (error.message.includes("Já existe um template")) {
        return res.status(409).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  },

  /**
   * Atualiza um template existente
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async updateTemplate(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID do template não fornecido",
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: "Conteúdo do template é obrigatório",
        });
      }

      const template = await templateService.updateTemplate(id, content);

      res.json({
        success: true,
        message: "Template atualizado com sucesso",
        data: template,
      });
    } catch (error) {
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  },

  /**
   * Exclui um template
   * @param {Object} req - Requisição Express
   * @param {Object} res - Resposta Express
   * @param {Function} next - Função next do Express
   */
  async deleteTemplate(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID do template não fornecido",
        });
      }

      await templateService.deleteTemplate(id);

      res.json({
        success: true,
        message: "Template excluído com sucesso",
      });
    } catch (error) {
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  },
};

module.exports = templateController;
