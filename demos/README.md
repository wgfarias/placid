# 🎨 Demos dos Templates

Esta pasta contém **versões demonstrativas** de todos os templates disponíveis na API.

## 📋 Propósito

Os arquivos desta pasta servem para:

- **Visualizar** como cada template fica quando preenchido
- **Testar** o design antes de usar na API
- **Demonstrar** para clientes e desenvolvedores
- **Debug** de problemas visuais
- **Referência** para criar novos templates

## 🚀 Como Usar

1. **Abrir no navegador** - Visualize diretamente no browser
2. **Capturar screenshot** - Para apresentações e documentação
3. **Testar responsividade** - Verificar comportamento em diferentes telas
4. **Validar design** - Conferir se está conforme esperado

## 📁 Estrutura

```
demos/
├── README.md
├── simple_1.html          # Demo do template simple_1
├── instagram.html         # Demo do template instagram (futuro)
├── twitter_card.html      # Demo do template twitter_card (futuro)
└── ...                    # Outros templates
```

## ⚠️ Importante

- **Dados estáticos**: Estes arquivos usam dados de exemplo fixos
- **Não dinâmicos**: Não contêm tags `{{variavel}}`
- **Apenas demonstração**: Para visualização, não para uso na API
- **Manter atualizado**: Quando alterar um template, atualize o demo correspondente

## 🛠️ Criando Novos Demos

Para criar um novo demo:

1. Copie o template original de `src/templates/`
2. Substitua todas as tags `{{variavel}}` por valores reais
3. Use dados atraentes e representativos
4. Teste no navegador para garantir que funciona
5. Salve com o mesmo nome do template original

## 📝 Convenções

- **Mesmos nomes**: `simple_1.html` (template) → `simple_1.html` (demo)
- **Dados realistas**: Use exemplos que mostrem o potencial do template
- **Imagens públicas**: Use URLs de serviços como Unsplash
- **Cores harmoniosas**: Escolha paletas que destaquem o design
