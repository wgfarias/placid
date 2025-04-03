# Placid API

API para geração de imagens baseadas em templates HTML, similar ao Placid API.

## Descrição

Esta API permite criar e gerenciar templates HTML que serão utilizados para gerar imagens. Os templates podem conter placeholders que serão substituídos por dados fornecidos via API.

## Funcionalidades

- Geração de imagens a partir de templates HTML
- Suporte a vários formatos e tamanhos de imagem
- Templates pré-configurados para redes sociais
- API RESTful com autenticação via chave API
- Fácil integração com n8n para automação de fluxos

## Templates Disponíveis

A API inclui os seguintes templates prontos para uso:

1. **basic** - Template básico (1200x630px)
2. **instagram** - Post para Instagram (1080x1080px)
3. **instagram_story** - Story para Instagram (1080x1920px)
4. **modelo_post** - Template para post genérico (1080x1080px)
5. **twitter_card** - Card para Twitter/X (1200x628px)

## Tecnologias Utilizadas

- Node.js
- Express
- Puppeteer (para renderização HTML → imagem)
- Cheerio (para processamento de HTML)
- Autenticação via API Key

## Estrutura do Projeto

```
placid-api/
├── examples/           # Exemplos de uso da API
├── src/
│   ├── config/         # Configurações da aplicação
│   ├── controllers/    # Controladores das rotas
│   ├── middlewares/    # Middlewares (autenticação, etc.)
│   ├── models/         # Modelos de dados
│   ├── public/         # Arquivos públicos
│   │   └── images/     # Imagens geradas
│   ├── routes/         # Rotas da API
│   ├── services/       # Serviços da aplicação
│   ├── templates/      # Templates HTML
│   ├── utils/          # Funções utilitárias
│   └── index.js        # Ponto de entrada da aplicação
├── .env                # Variáveis de ambiente
├── ecosystem.config.js # Configuração do PM2
├── nginx-placid-api.conf # Configuração do Nginx
├── package.json        # Dependências e scripts
├── README-DEPLOY.md    # Instruções de implantação
└── README.md           # Documentação
```

## Instalação

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`
4. Inicie a aplicação:
   ```
   npm run dev
   ```

## Endpoints da API

### Templates

- `GET /api/templates` - Lista todos os templates
- `GET /api/templates/:id` - Obtém um template específico
- `POST /api/templates` - Cria um novo template
- `PUT /api/templates/:id` - Atualiza um template existente
- `DELETE /api/templates/:id` - Exclui um template

### Imagens

- `POST /api/images/generate` - Gera uma imagem a partir de um template
- `GET /api/images` - Lista histórico de imagens geradas
- `GET /api/images/:id` - Obtém uma imagem específica
- `DELETE /api/images/:id` - Exclui uma imagem

## Exemplos de Uso

### Geração de imagem para Instagram

```json
POST /api/images/generate
{
  "templateId": "instagram",
  "data": {
    "backgroundImage": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1080",
    "overlayColor": "rgba(0, 0, 0, 0.5)",
    "overlayOpacity": "0.7",
    "logoUrl": "https://example.com/logo.png",
    "badgeText": "Nova Coleção",
    "title": "Estilo & Elegância",
    "subtitle": "Descubra as tendências da nova temporada",
    "highlightText": "2025",
    "accentColor": "#e74c3c",
    "titleColor": "#ffffff",
    "subtitleColor": "#f0f0f0",
    "footerColor": "#e0e0e0",
    "footerText": "Disponível em todas as lojas",
    "socialHandle": "@sua.marca"
  }
}
```

### Geração de imagem para Twitter

```json
POST /api/images/generate
{
  "templateId": "twitter_card",
  "data": {
    "backgroundColor": "#ffffff",
    "imageUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
    "logoUrl": "https://example.com/logo.png",
    "tagText": "Webinar Gratuito",
    "headline": "Como construir uma presença digital autêntica",
    "subheadline": "Aprenda estratégias eficientes para criar uma identidade única para sua marca.",
    "ctaText": "Inscreva-se Agora",
    "websiteUrl": "www.seusite.com.br/webinar",
    "accentColor": "#1da1f2",
    "titleColor": "#14171a",
    "subtitleColor": "#657786"
  }
}
```

## Autenticação

Todas as rotas (exceto a de visualização de imagens) requerem autenticação via API Key. Adicione o cabeçalho `x-api-key` com o valor da sua chave de API em todas as requisições.

## Integração com n8n

Esta API foi projetada para ser facilmente integrada com o n8n. Você pode usar os nós HTTP Request para se comunicar com a API e gerar imagens a partir dos seus fluxos de trabalho.

## Desenvolvimento

```
npm run dev
```

## Produção

```
npm start
```

Para informações detalhadas sobre implantação em produção, consulte o arquivo [README-DEPLOY.md](README-DEPLOY.md).
