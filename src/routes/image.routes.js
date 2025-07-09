const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Gerar uma imagem a partir de um template
router.post("/generate", authMiddleware, imageController.generateImage);

// Gerar múltiplas imagens em formato carrossel
router.post(
  "/generate-carousel",
  authMiddleware,
  imageController.generateCarousel
);

// Obter uma imagem pelo ID
router.get("/:id", imageController.getImageById);

// Listar histórico de imagens geradas
router.get("/", authMiddleware, imageController.getGeneratedImages);

// Excluir uma imagem
router.delete("/:id", authMiddleware, imageController.deleteImage);

module.exports = router;
