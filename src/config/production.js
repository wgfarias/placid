/**
 * Configurações para ambiente de produção
 */
module.exports = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0", // Permitir conexões de qualquer IP
  },

  // Configurações de segurança
  security: {
    apiKey: process.env.API_KEY, // Chave da API definida em variáveis de ambiente
    allowedOrigins: ["*"], // Origens permitidas para CORS (recomendável restringir em produção)
  },

  // Configurações de armazenamento
  storage: {
    imagesPath: process.env.STORAGE_PATH || "./src/public/images",
  },

  // Configurações do Puppeteer
  puppeteer: {
    // Argumentos para o Chrome em ambiente de servidor Linux
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
    defaultViewport: {
      width: 1200,
      height: 630,
    },
    headless: "new",
  },
};
