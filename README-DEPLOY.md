# Guia de Implantação - Placid API

Este guia fornece instruções detalhadas para implantar a Placid API em um servidor VPS da Hostinger.

## Requisitos do Servidor

- Node.js 16.x ou superior
- npm 8.x ou superior
- PM2 (gerenciador de processos)
- Nginx (para proxy reverso)
- Dependências do Puppeteer para Linux

## Passo 1: Preparar o Servidor

Conecte-se ao seu servidor VPS via SSH:

```bash
ssh seu-usuario@seu-servidor
```

Atualize o sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

## Passo 2: Instalar Node.js e npm

```bash
# Instalar curl se não estiver instalado
sudo apt install -y curl

# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar Node.js e npm
sudo apt install -y nodejs

# Verificar instalação
node -v
npm -v
```

## Passo 3: Instalar Dependências do Puppeteer

O Puppeteer necessita de várias dependências para funcionar corretamente no Linux:

```bash
sudo apt install -y \
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
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget
```

## Passo 4: Instalar PM2 Globalmente

```bash
sudo npm install -g pm2
```

## Passo 5: Configurar e Implantar a Aplicação

### Criar diretório para a aplicação

```bash
mkdir -p /var/www/placid-api
cd /var/www/placid-api
```

### Transferir os arquivos da aplicação

Você pode usar git, scp ou outro método para transferir os arquivos:

```bash
# Opção 1: Clonar de um repositório Git
git clone seu-repositorio-git .

# Opção 2: Transferir via SCP (do seu computador local)
scp -r ./placid-api/* seu-usuario@seu-servidor:/var/www/placid-api/
```

### Instalar dependências

```bash
cd /var/www/placid-api
npm install --production
```

### Configurar variáveis de ambiente

Edite o arquivo `.env` ou o arquivo `ecosystem.config.js` para configurar:

```bash
nano ecosystem.config.js
```

Altere a API_KEY para uma chave segura e configure outras opções conforme necessário.

### Iniciar a aplicação com PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Siga as instruções dadas pelo comando `pm2 startup` para configurar o início automático.

## Passo 6: Configurar Nginx como Proxy Reverso

### Instalar Nginx

```bash
sudo apt install -y nginx
```

### Configurar site

```bash
sudo nano /etc/nginx/sites-available/placid-api
```

Adicione a seguinte configuração:

```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Configuração para servir imagens geradas
    location /images/ {
        alias /var/www/placid-api/src/public/images/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

### Ativar o site e reiniciar Nginx

```bash
sudo ln -s /etc/nginx/sites-available/placid-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Passo 7: Configurar HTTPS com Let's Encrypt (Recomendado)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

Siga as instruções do assistente para configurar HTTPS.

## Passo 8: Verificar a Instalação

Acesse a API em:

```
https://seu-dominio.com
```

Teste a API com uma chamada GET:

```
curl https://seu-dominio.com
```

## Configuração do Firewall (Opcional)

```bash
sudo apt install -y ufw
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

## Manutenção e Monitoramento

### Monitorar logs da aplicação

```bash
pm2 logs placid-api
```

### Reiniciar a aplicação

```bash
pm2 restart placid-api
```

### Atualizar a aplicação

```bash
cd /var/www/placid-api
git pull  # se estiver usando git
npm install --production
pm2 restart placid-api
```

## Integração com n8n

No n8n, configure a chamada HTTP para:

```
https://seu-dominio.com/api/images/generate
```

Adicione o header:

```
x-api-key: sua-chave-api-secreta
```

Body (JSON):

```json
{
  "templateId": "nome-do-template",
  "data": {
    "titulo": "Título Exemplo",
    "subtitulo": "Subtítulo Exemplo",
    "background": "https://exemplo.com/imagem.jpg",
    "logo": "https://exemplo.com/logo.png"
  }
}
```
