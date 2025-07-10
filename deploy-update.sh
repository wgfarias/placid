#!/bin/bash

# Script de Atualização - Placid API
# Execute este script no servidor para atualizar a aplicação

echo "🚀 Iniciando atualização da Placid API..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório da aplicação (/var/www/placid-api)"
    exit 1
fi

# 1. Fazer backup dos arquivos importantes (opcional)
echo "📦 Fazendo backup da configuração atual..."
cp ecosystem.config.js ecosystem.config.js.backup.$(date +%Y%m%d_%H%M%S)

# 2. Baixar as últimas mudanças
echo "⬇️  Baixando últimas mudanças do repositório..."
git pull origin master

if [ $? -ne 0 ]; then
    echo "❌ Erro ao fazer git pull. Verifique as configurações do git."
    exit 1
fi

# 3. Instalar/atualizar dependências
echo "📦 Instalando dependências..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências."
    exit 1
fi

# 4. Reiniciar aplicação
echo "🔄 Reiniciando aplicação..."
pm2 restart placid-api

if [ $? -ne 0 ]; then
    echo "❌ Erro ao reiniciar aplicação com PM2."
    exit 1
fi

# 5. Verificar status
echo "✅ Verificando status da aplicação..."
sleep 3
pm2 status placid-api

# 6. Mostrar logs recentes
echo "📄 Logs recentes:"
pm2 logs placid-api --lines 10

echo ""
echo "🎉 Atualização concluída com sucesso!"
echo "📝 Para monitorar a aplicação: pm2 logs placid-api"
echo "🔄 Para reiniciar novamente: pm2 restart placid-api"
echo "📊 Para ver status: pm2 status" 