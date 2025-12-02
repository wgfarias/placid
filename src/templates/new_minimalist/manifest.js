module.exports = {
  id: "new_minimalist",
  name: "New Minimalist",
  description:
    "Um tema moderno, limpo e focado em tipografia forte e contrastes de cores.",
  previews: {
    cover: "/images/previews/new_minimalist_cover.jpg",
    slide_light: "/images/previews/new_minimalist_slide_light.jpg",
    slide_dark: "/images/previews/new_minimalist_slide_dark.jpg",
    slide_highlight: "/images/previews/new_minimalist_slide_highlight.jpg",
    slide_list: "/images/previews/new_minimalist_slide_list.jpg",
    cta: "/images/previews/new_minimalist_cta.jpg",
  },
  slides: [
    {
      id: "new_minimalist_cover",
      name: "Capa Impactante",
      type: "cover",
      fields: [
        {
          name: "texto1",
          label: "Título Principal",
          type: "text",
          required: true,
        },
        { name: "texto2", label: "Subtítulo", type: "text" },
        { name: "backgroundImage", label: "Imagem de Fundo", type: "image" },
        { name: "logoUrl", label: "Logo", type: "image" },
      ],
    },
    {
      id: "new_minimalist_slide_light",
      name: "Conteúdo Claro",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text" },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        { name: "icon", label: "Ícone (emoji)", type: "text" },
      ],
    },
    {
      id: "new_minimalist_slide_dark",
      name: "Conteúdo Escuro",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text" },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        { name: "background_color", label: "Cor de Fundo", type: "color" },
      ],
    },
    {
      id: "new_minimalist_slide_highlight",
      name: "Destaque (Frase)",
      type: "highlight",
      fields: [
        { name: "texto1", label: "Intro (Pequeno)", type: "text" },
        {
          name: "texto2",
          label: "Frase de Impacto (Grande)",
          type: "textarea",
        },
        { name: "texto3", label: "Rodapé", type: "text" },
        { name: "background_color", label: "Cor de Fundo", type: "color" },
      ],
    },
    {
      id: "new_minimalist_slide_list",
      name: "Lista Numerada",
      type: "list",
      fields: [
        { name: "texto1", label: "Título da Lista", type: "text" },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        { name: "icon", label: "Ícone (emoji)", type: "text" },
        { name: "background_color", label: "Cor de Fundo", type: "color" },
      ],
    },
    {
      id: "new_minimalist_cta",
      name: "Chamada para Ação (CTA)",
      type: "cta",
      fields: [
        { name: "texto1", label: "Chamada Principal", type: "text" },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        { name: "texto3", label: "Texto Completo", type: "textarea" },
        { name: "background_color", label: "Cor de Fundo", type: "color" },
      ],
    },
  ],
  theme: {
    colors: [
      { name: "cor_primaria", label: "Cor de Destaque", default: "#e65100" },
      {
        name: "cor_secundaria",
        label: "Cor de Fundo/Base",
        default: "#1a1a1a",
      },
    ],
    fonts: [{ name: "fonte", label: "Família de Fonte", default: "Inter" }],
  },
};
