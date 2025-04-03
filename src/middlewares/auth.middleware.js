/**
 * Middleware de autenticação para API
 * Verifica se o API Key fornecido no header é válido
 */
const authMiddleware = (req, res, next) => {
  // Obter o API key do header
  const apiKey = req.headers["x-api-key"];

  // Verificar se o API key está presente
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API Key não fornecida",
    });
  }

  // Verificar se o API key é válido
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: "API Key inválida",
    });
  }

  // Se chegou aqui, a autenticação foi bem-sucedida
  next();
};

module.exports = authMiddleware;
