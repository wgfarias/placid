// Importações
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

// Iniciando o app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Rota básica
app.get("/", (req, res) => {
  res.json({
    message:
      "Placid API - Serviço de geração de imagens baseadas em templates HTML",
  });
});

// Importar rotas
const templateRoutes = require("./routes/template.routes");
const imageRoutes = require("./routes/image.routes");

// Usar rotas
app.use("/api/templates", templateRoutes);
app.use("/api/images", imageRoutes);

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erro no servidor",
    error:
      process.env.NODE_ENV === "development" ? err.message : "Erro interno",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
