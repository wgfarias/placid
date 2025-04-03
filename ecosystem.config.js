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
      },
    },
  ],
};
