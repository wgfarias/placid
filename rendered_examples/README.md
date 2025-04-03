# Exemplos Renderizados dos Templates

Esta pasta contém exemplos gerados para todos os templates disponíveis na API Placid.

## Como usar

Estas imagens são geradas automaticamente a partir dos templates com dados de exemplo definidos na pasta `examples/`.

Para gerar as imagens novamente, execute:

```bash
npm run generate:examples
```

## Lista de Templates

Abaixo estão os templates disponíveis e suas respectivas imagens de exemplo:

| Template        | Descrição                                     | Dimensões   |
| --------------- | --------------------------------------------- | ----------- |
| ia_news         | Template de notícias sobre IA                 | 1080x1350px |
| instagram       | Template para posts do Instagram              | 1080x1080px |
| instagram_story | Template para stories do Instagram            | 1080x1920px |
| modelo_post     | Template versátil para posts em redes sociais | 1080x1080px |
| twitter_card    | Template para cards do Twitter/X              | 1200x628px  |

## Personalização

Você pode personalizar qualquer um desses templates modificando os arquivos JSON na pasta `examples/` ou enviando seus próprios dados para a API.
