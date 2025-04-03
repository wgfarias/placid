# Placid API

API para geração automática de imagens para mídias sociais e outros fins, baseada em templates HTML com suporte a personalização dinâmica.

## Recursos

- Geração de imagens a partir de templates HTML
- Personalização dinâmica via JSON
- Suporte a diversos formatos e dimensões
- Otimização para diferentes plataformas de mídia social
- API RESTful com chave de autenticação

## Templates Disponíveis

| Template        | Dimensões   | Descrição                                              |
| --------------- | ----------- | ------------------------------------------------------ |
| instagram       | 1080x1080px | Template elegante para posts do Instagram              |
| instagram_story | 1080x1920px | Template para Stories com elementos interativos        |
| modelo_post     | 1080x1080px | Template versátil para posts em diversas redes sociais |
| twitter_card    | 1200x628px  | Template otimizado para cards do Twitter/X             |

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/placid-api.git
cd placid-api

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

## Configuração

Edite o arquivo `.env` com suas configurações:

```
PORT=3000
API_KEY=placid_secret_key
NODE_ENV=development
```

## Uso

### Iniciar o servidor

```bash
npm run dev
```

### Testar templates

```bash
# Testar um template específico
npm run test:template instagram

# Ou com Node diretamente
node scripts/test-template.js modelo_post
```

### Exemplos de Requisição

```json
{
  "templateId": "modelo_post",
  "data": {
    "title": "Título da Imagem",
    "subtitle": "Subtítulo com informações adicionais",
    "backgroundImage": "https://exemplo.com/imagem.jpg",
    "logoUrl": "https://exemplo.com/logo.png"
    // Outras propriedades específicas do template
  },
  "options": {
    "format": "png",
    "quality": 90
  }
}
```

## Implantação

Para instruções detalhadas sobre como implantar em ambiente de produção, consulte o arquivo `README-DEPLOY.md`.

## Integração com n8n

Esta API foi projetada para trabalhar facilmente com o n8n para automação de fluxos de trabalho. Configure um nó HTTP Request no n8n apontando para sua API com os parâmetros necessários.

## Licença

MIT
