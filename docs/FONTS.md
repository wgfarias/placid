# 🔤 Fontes Disponíveis nos Templates

Esta é a lista completa de fontes suportadas nos templates da Placid API, compatível com o frontend.

## 📝 Como Usar

No JSON do template, use a propriedade `titleFont`:

```json
{
  "templateId": "simple_1",
  "data": {
    "title": "Seu Título",
    "titleFont": "Oswald",
    "titleColor": "#ffffff"
    // ... outros dados
  }
}
```

## 🎨 Fontes do Sistema

Estas fontes já estão instaladas na maioria dos sistemas operacionais:

- `Arial`
- `Arial Black`
- `Georgia`
- `Times New Roman`
- `Courier New`
- `Verdana`
- `Tahoma`
- `Trebuchet MS`
- `Helvetica`
- `Impact`
- `Comic Sans MS`
- `Palatino`
- `Garamond`
- `Bookman`
- `Avant Garde`
- `Century Gothic`
- `Lucida Console`

## 🌐 Google Fonts

Estas fontes são carregadas dinamicamente do Google Fonts:

### Sans-serif

- `Open Sans` - Fonte limpa e moderna
- `Roboto` - Fonte do Material Design
- `Lato` - Elegante e legível
- `Source Sans Pro` - Desenvolvida pela Adobe
- `Montserrat` - Inspirada na tipografia urbana
- `Poppins` - Geométrica e amigável
- `Inter` - Otimizada para interfaces
- `Nunito` - Arredondada e suave

### Serif

- `Playfair Display` - Elegante para títulos
- `Merriweather` - Ótima para leitura

### Display/Decorativas

- `Oswald` - Condensada e impactante
- `Dancing Script` - Cursiva elegante
- `Pacifico` - Divertida e descontraída

## 🔧 Implementação Técnica

As fontes do Google Fonts são importadas via CSS:

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;700&family=Lato:wght@400;700&family=Source+Sans+Pro:wght@400;600;700&family=Montserrat:wght@400;600;700&family=Poppins:wght@400;600;700&family=Inter:wght@400;600;700;800&family=Nunito:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Oswald:wght@400;600;700&family=Dancing+Script:wght@400;700&family=Pacifico&display=swap");
```

## 📱 Compatibilidade

- ✅ **Compatível com o frontend**
- ✅ **Funciona em todos os templates**
- ✅ **Fallback para fontes do sistema**
- ✅ **Otimizado para performance**

## 🎯 Recomendações

### Para Títulos

- `Oswald` - Impacto e força
- `Playfair Display` - Elegância
- `Montserrat` - Modernidade
- `Poppins` - Amigável

### Para Textos

- `Open Sans` - Legibilidade
- `Roboto` - Neutralidade
- `Lato` - Elegância
- `Source Sans Pro` - Profissionalismo

### Para Marcas

- `Inter` - Tecnologia
- `Nunito` - Criatividade
- `Dancing Script` - Personalidade
- `Pacifico` - Diversão

## 🔄 Atualização

Última atualização: Janeiro 2025
Total de fontes: 31 fontes disponíveis
