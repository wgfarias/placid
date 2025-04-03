#!/bin/bash

# Script de configuração para Placid API
# Execute este script como root ou com sudo

echo "=== Configurando servidor para Placid API ==="

# Atualizar sistema
echo "Atualizando sistema..."
apt update && apt upgrade -y

# Instalar Node.js
echo "Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verificar instalação
node -v
npm -v

# Instalar dependências do Puppeteer
echo "Instalando dependências do Puppeteer..."
apt install -y \
    gconf-service \
    libgbm-dev \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget

# Instalar PM2
echo "Instalando PM2..."
npm install -g pm2

# Instalar Nginx
echo "Instalando Nginx..."
apt install -y nginx

echo "=== Configuração básica concluída ==="
echo "Agora você pode:"
echo "1. Configurar o Nginx para a Placid API"
echo "2. Instalar as dependências da aplicação"
echo "3. Iniciar a aplicação com PM2"

echo ""
echo "Para gerar um certificado SSL com Let's Encrypt:"
echo "apt install -y certbot python3-certbot-nginx"
echo "certbot --nginx -d seu-dominio.com" 