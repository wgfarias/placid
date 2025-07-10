# Template Carrossel Demo

Este conjunto de templates foi criado para demonstrar a funcionalidade de carrossel da Placid API, permitindo criar apresentações completas com múltiplos slides e designs diferentes.

## ✨ Melhorias Recentes

### 🎨 Espaçamento Aprimorado

- **Slides 2 e 3**: Padding aumentado de `80px 60px` para `100px 80px`
- Maior respiro para o conteúdo e melhor legibilidade
- Melhora significativa na experiência visual

### 🔄 Continuidade Visual

- **Slides 2 e 3**: Imagens posicionadas estrategicamente para criar sequência
- Slide 2: `background-position: left center` (mostra parte esquerda)
- Slide 3: `background-position: right center` (mostra parte direita)
- Efeito de "caminhada" pela mesma cena ou diferentes ângulos

### 📱 Texto Responsivo

- Implementação de `clamp()` em todos os elementos de texto
- Ajuste automático sem JavaScript
- Perfeita adaptação a diferentes tamanhos de tela

## 📋 Estrutura do Carrossel

### 5 Slides Únicos:

1. **Slide 1 - Capa** (`carousel_slide_1.html`)

   - Título principal grande
   - Subtítulo explicativo
   - Logo centralizado
   - Imagem de fundo com overlay escuro
   - Perfeito para abertura e branding

2. **Slide 2 - Conteúdo** (`carousel_slide_2.html`)

   - Layout com sidebar direita
   - Área de conteúdo principal (título + texto)
   - Imagem lateral sem overlay (posicionada à esquerda)
   - Espaçamento aprimorado para melhor legibilidade
   - Ideal para apresentar informações detalhadas

3. **Slide 3 - Conteúdo** (`carousel_slide_3.html`)

   - Layout com sidebar esquerda
   - Conteúdo alinhado à direita
   - Imagem posicionada à direita para continuidade visual
   - Variação visual do slide 2
   - Quebra a monotonia do layout

4. **Slide 4 - Conteúdo Genérico** (`carousel_slide_4.html`)

   - Layout centralizado
   - Slide genérico para qualquer conteúdo
   - Ideal para mensagens importantes e destaques
   - Design clean e focado no conteúdo

5. **Slide 5 - Fechamento** (`carousel_slide_5.html`)
   - Call-to-action destacado
   - Informações de contato
   - QR code para conversão
   - Imagem de fundo com overlay
   - Perfeito para gerar ações

## 🎯 Como Usar

### 1. Visualizar Demo

Abra o arquivo `carousel_demo.html` em seu navegador para ver todos os slides em uma única página.

### 2. Teste Individual

Abra qualquer arquivo `carousel_slide_X.html` para visualizar e testar cada slide individualmente.

### 3. Usar com a API

Use o endpoint `/api/images/generate-carousel` com a estrutura do arquivo `carousel_demo_preenchido.json`:

```bash
curl -X POST http://localhost:3000/api/images/generate-carousel \
  -H "Content-Type: application/json" \
  -d @examples/carousel_demo_preenchido.json
```

## 🔧 Personalizações Disponíveis

### Slide 1 (Capa):

- `title`: Título principal
- `subtitle`: Subtítulo explicativo
- `backgroundImage`: URL da imagem de fundo
- `logo`: URL do logo
- `titleColor`: Cor do título
- `subtitleColor`: Cor do subtítulo
- `titleFont`: Fonte do título (Inter, Poppins, Montserrat)
- `titleTransform`: Transformação do texto (none, uppercase, lowercase, capitalize)

### Slide 2 & 3 (Conteúdo):

- `title`: Título do slide
- `text`: Primeiro parágrafo
- `text2`: Segundo parágrafo
- `sidebarImage`: URL da imagem lateral
- `logo`: URL do logo
- `titleColor`: Cor do título
- `textColor`: Cor do texto
- `accentColor`: Cor de destaque
- `titleFont`: Fonte do título
- `titleTransform`: Transformação do texto

### Slide 4 (Conteúdo Genérico):

- `title`: Título do slide
- `text`: Texto do conteúdo
- `logo`: URL do logo
- `titleColor`: Cor do título
- `textColor`: Cor do texto
- `accentColor`: Cor de destaque
- `titleFont`: Fonte do título
- `titleTransform`: Transformação do texto

### Slide 5 (Fechamento):

- `title`: Título principal
- `subtitle`: Subtítulo
- `ctaText`: Texto do botão CTA
- `ctaColor`: Cor do botão CTA
- `backgroundImage`: URL da imagem de fundo
- `logo`: URL do logo
- `email`: Email de contato
- `phone`: Telefone de contato
- `qrCodeUrl`: URL do QR code
- `titleColor`: Cor do título
- `subtitleColor`: Cor do subtítulo

## 📐 Especificações Técnicas

- **Dimensões**: 1080x1350px (formato Instagram Story/Reels)
- **Fontes**: Inter, Poppins, Montserrat (Google Fonts)
- **Formato de saída**: PNG de alta qualidade
- **Compatibilidade**: Otimizado para redes sociais
- **Responsividade**: Design adaptável e flexível

## 🚀 Exemplos de Uso

### Empresas/Startups:

- Apresentação de produtos
- Campanhas de marketing
- Relatórios de resultados
- Conteúdo para LinkedIn/Instagram

### Agências:

- Apresentação de portfólio
- Cases de sucesso
- Propostas comerciais
- Conteúdo para redes sociais

### Freelancers:

- Apresentação de serviços
- Demonstração de expertise
- Geração de leads
- Branding pessoal

## 📁 Arquivos Incluídos

```
demos/
├── carousel_slide_1.html      # Slide 1 - Capa
├── carousel_slide_2.html      # Slide 2 - Conteúdo
├── carousel_slide_3.html      # Slide 3 - Conteúdo
├── carousel_slide_4.html      # Slide 4 - Conteúdo Genérico
├── carousel_slide_5.html      # Slide 5 - Fechamento
├── carousel_demo.html         # Visualização completa
└── README_carousel.md         # Este arquivo

examples/
├── carousel_demo.json         # Estrutura de dados vazia
└── carousel_demo_preenchido.json # Exemplo com dados reais
```

## 🎨 Design System

O template utiliza um design system coeso com:

- Paleta de cores harmoniosa
- Tipografia consistente
- Espacamentos padronizados
- Elementos visuais unificados
- Transições suaves entre slides

## 📞 Suporte

Para dúvidas sobre implementação ou personalização dos templates, entre em contato com a equipe de desenvolvimento da Placid API.
