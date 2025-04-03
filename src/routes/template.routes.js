const express = require("express");
const router = express.Router();
const templateController = require("../controllers/template.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Listar todos os templates
router.get("/", authMiddleware, templateController.getAllTemplates);

// Obter um template específico
router.get("/:id", authMiddleware, templateController.getTemplateById);

// Criar um novo template
router.post("/", authMiddleware, templateController.createTemplate);

// Atualizar um template
router.put("/:id", authMiddleware, templateController.updateTemplate);

// Excluir um template
router.delete("/:id", authMiddleware, templateController.deleteTemplate);

module.exports = router;
