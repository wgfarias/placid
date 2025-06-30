module.exports = {
  apps: [
    {
      name: "placid-api",
      script: "src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        API_KEY: "placid_secret_key", // Altere para uma chave segura em produção
        STORAGE_PATH: "./src/public/images",
        // Configurações do upload para SNDT
        UPLOAD_TO_SNDT: "true",
        DELETE_LOCAL_AFTER_UPLOAD: "true",
        SNDT_API_TOKEN: "sndt_live_abc123def456", // Altere para o token real em produção
        SNDT_API_URL: "https://files.sndt.com.br/placid/api/upload-base64.php",
      },
    },
  ],
};
