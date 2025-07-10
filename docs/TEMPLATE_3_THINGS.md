# Template 3_things

Template oficial de carrossel para apresentações de "3 dicas" ou conteúdo educacional similar.

## 📋 Visão Geral

O template `3_things` é uma solução completa para criar carrosséis de apresentação focados em conteúdo educacional e marketing. Ideal para demonstrar 3 dicas, processos, benefícios ou qualquer conteúdo que siga a estrutura de introdução → 3 pontos principais → call-to-action.

## 🎯 Casos de Uso

### 📈 Marketing Digital

- Apresentações de produtos/serviços
- Campanhas educacionais
- Geração de leads
- Conteúdo para redes sociais

### 🏢 Corporativo

- Treinamentos internos
- Apresentações comerciais
- Demonstrações de processos
- Relatórios executivos

### 📚 Educacional

- Materiais didáticos
- Tutoriais passo a passo
- Resumos de conteúdo
- Workshops e palestras

## 📐 Especificações Técnicas

- **Dimensões**: 1080x1350px (formato Instagram Story/Reels)
- **Slides**: 5 templates distintos
- **Fontes**: Inter, Poppins, Montserrat (Google Fonts)
- **Texto Responsivo**: Implementação de `clamp()` para adaptação automática
- **Continuidade Visual**: Slides 2 e 3 com sequência de imagens
- **Formato de Saída**: PNG de alta qualidade

## 🎨 Estrutura dos Slides

### Slide 1 - Capa (`3_things_slide_1`)

**Propósito**: Apresentação inicial com título chamativo

**Elementos**:

- Título principal (texto responsivo)
- Subtítulo explicativo
- Logo da empresa
- Imagem de fundo com overlay
- Elemento decorativo (ponto de destaque)

**Campos personalizáveis**:

```json
{
  "title": "string",
  "subtitle": "string",
  "backgroundImage": "url",
  "logo": "url",
  "titleColor": "hex",
  "subtitleColor": "hex",
  "accentColor": "hex",
  "titleFont": "Inter|Poppins|Montserrat",
  "titleTransform": "none|uppercase|lowercase|capitalize"
}
```

### Slide 2 - Primeira Dica (`3_things_slide_2`)

**Propósito**: Apresentação da primeira dica com sidebar à direita

**Elementos**:

- Título da dica
- Dois parágrafos de texto
- Imagem lateral (sidebar direita)
- Logo da empresa
- Linha de destaque

**Campos personalizáveis**:

```json
{
  "title": "string",
  "text": "string",
  "text2": "string",
  "sidebarImage": "url",
  "logo": "url",
  "titleColor": "hex",
  "textColor": "hex",
  "accentColor": "hex",
  "titleFont": "Inter|Poppins|Montserrat",
  "titleTransform": "none|uppercase|lowercase|capitalize"
}
```

### Slide 3 - Segunda Dica (`3_things_slide_3`)

**Propósito**: Apresentação da segunda dica com sidebar à esquerda

**Elementos**:

- Título da dica
- Dois parágrafos de texto
- Imagem lateral (sidebar esquerda)
- Logo da empresa
- Linha de destaque
- Continuidade visual com slide 2

**Campos personalizáveis**:

```json
{
  "title": "string",
  "text": "string",
  "text2": "string",
  "sidebarImage": "url",
  "logo": "url",
  "titleColor": "hex",
  "textColor": "hex",
  "accentColor": "hex",
  "titleFont": "Inter|Poppins|Montserrat",
  "titleTransform": "none|uppercase|lowercase|capitalize"
}
```

### Slide 4 - Terceira Dica (`3_things_slide_4`)

**Propósito**: Apresentação da terceira dica com layout centralizado

**Elementos**:

- Título da dica
- Texto principal
- Logo da empresa
- Elementos decorativos
- Caixa de destaque

**Campos personalizáveis**:

```json
{
  "title": "string",
  "text": "string",
  "logo": "url",
  "titleColor": "hex",
  "textColor": "hex",
  "accentColor": "hex",
  "titleFont": "Inter|Poppins|Montserrat",
  "titleTransform": "none|uppercase|lowercase|capitalize"
}
```

### Slide 5 - Fechamento (`3_things_slide_5`)

**Propósito**: Call-to-action final com informações de contato

**Elementos**:

- Título de fechamento
- Subtítulo motivacional
- Botão de CTA
- Informações de contato (email, telefone)
- QR code
- Imagem de fundo com overlay

**Campos personalizáveis**:

```json
{
  "title": "string",
  "subtitle": "string",
  "ctaText": "string",
  "ctaColor": "hex",
  "backgroundImage": "url",
  "logo": "url",
  "email": "string",
  "phone": "string",
  "qrCodeUrl": "url",
  "titleColor": "hex",
  "subtitleColor": "hex",
  "titleFont": "Inter|Poppins|Montserrat",
  "titleTransform": "none|uppercase|lowercase|capitalize"
}
```

## 🔧 Como Usar

### Endpoint da API

```
POST /api/images/generate-carousel
Content-Type: application/json
X-API-Key: YOUR_API_KEY
```

### Estrutura do Payload

```json
{
  "template": "3_things",
  "slides": [
    {
      "template": "3_things_slide_1",
      "data": {
        /* dados do slide 1 */
      }
    },
    {
      "template": "3_things_slide_2",
      "data": {
        /* dados do slide 2 */
      }
    },
    {
      "template": "3_things_slide_3",
      "data": {
        /* dados do slide 3 */
      }
    },
    {
      "template": "3_things_slide_4",
      "data": {
        /* dados do slide 4 */
      }
    },
    {
      "template": "3_things_slide_5",
      "data": {
        /* dados do slide 5 */
      }
    }
  ]
}
```

### Exemplo Completo

Consulte o arquivo `examples/3_things.json` para um exemplo completo com dados reais.

### Teste via Script

```bash
# Teste completo do carrossel
node scripts/test-3-things.js

# Teste apenas slides individuais
node scripts/test-3-things.js --individual

# Teste completo (carrossel + slides individuais)
node scripts/test-3-things.js --full

# Mostrar apenas informações
node scripts/test-3-things.js --info
```

## 🎨 Recursos Especiais

### ✨ Texto Responsivo

Todos os elementos de texto utilizam `clamp()` para ajuste automático:

- Adapta-se a diferentes tamanhos de tela
- Mantém legibilidade em qualquer dispositivo
- Sem necessidade de JavaScript

### 🔄 Continuidade Visual

Os slides 2 e 3 criam uma sequência visual:

- Slide 2: `background-position: left center`
- Slide 3: `background-position: right center`
- Efeito de "caminhada" pela mesma cena

### 🎯 Espaçamento Otimizado

- Padding aprimorado: `100px 80px` nos slides de conteúdo
- Maior respiro para melhor legibilidade
- Composição visual equilibrada

## 📊 Paleta de Cores Padrão

```css
/* Cores primárias */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--accent-color: #667eea;

/* Cores de texto */
--title-dark: #2d3748;
--text-dark: #4a5568;
--title-light: #ffffff;
--text-light: #e2e8f0;

/* Cores de fundo */
--bg-light: #f7fafc;
--bg-gradient: linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%);
```

## 🚀 Dicas de Uso

### 📸 Imagens Recomendadas

- **Slides 1 e 5**: Imagens panorâmicas ou com elementos centrais
- **Slides 2 e 3**: Imagens com detalhes nas laterais para continuidade
- **Slide 4**: Não utiliza imagem de fundo

### 📝 Texto Ideal

- **Título principal**: 40-80 caracteres
- **Subtítulo**: 80-150 caracteres
- **Texto dos slides**: 150-300 caracteres por parágrafo
- **CTA**: 10-20 caracteres

### 🎯 Melhores Práticas

1. Use imagens de alta qualidade (mínimo 1080px de largura)
2. Mantenha consistência na paleta de cores
3. Teste em diferentes tamanhos de tela
4. Use logos em formato SVG quando possível
5. Evite textos muito longos nos slides de conteúdo

## 📁 Arquivos do Template

```
src/templates/
├── 3_things_slide_1.html    # Slide 1 - Capa
├── 3_things_slide_2.html    # Slide 2 - Primeira dica
├── 3_things_slide_3.html    # Slide 3 - Segunda dica
├── 3_things_slide_4.html    # Slide 4 - Terceira dica
└── 3_things_slide_5.html    # Slide 5 - Fechamento

examples/
└── 3_things.json            # Exemplo com dados reais

scripts/
└── test-3-things.js         # Script de teste

docs/
└── TEMPLATE_3_THINGS.md     # Esta documentação
```

## 🔄 Versionamento

- **v1.0.0**: Versão inicial com 5 slides
- **v1.1.0**: Adição de texto responsivo com clamp()
- **v1.2.0**: Implementação de continuidade visual
- **v1.3.0**: Espaçamento aprimorado e otimizações

## 📞 Suporte

Para dúvidas sobre implementação ou personalização:

- Email: suporte@placidapi.com
- Documentação: [docs.placidapi.com](https://docs.placidapi.com)
- GitHub: [github.com/placid-api](https://github.com/placid-api)

---

_Template criado para Placid API - Geração de imagens automatizada_
