module.exports = {
  id: "simple_white_1",
  name: "Simple White",
  description:
    "Um tema clean, elegante e minimalista com fundo branco e tipografia sofisticada.",
  previews: {
    cover: "/images/previews/simple_white_1_cover.jpg",
    intro: "/images/previews/simple_white_1_intro.jpg",
    slide_1: "/images/previews/simple_white_1_slide_1.jpg",
    slide_2: "/images/previews/simple_white_1_slide_2.jpg",
    slide_3: "/images/previews/simple_white_1_slide_3.jpg",
    slide_4: "/images/previews/simple_white_1_slide_4.jpg",
    slide_5: "/images/previews/simple_white_1_slide_5.jpg",
    cta: "/images/previews/simple_white_1_cta.jpg",
  },
  slides: [
    {
      id: "simple_white_1_cover",
      name: "Capa com Imagem Lateral",
      type: "cover",
      fields: [
        {
          name: "texto1",
          label: "Título Principal",
          type: "text",
          required: true,
        },
        { name: "texto2", label: "Subtítulo/Tema", type: "text" },
        { name: "backgroundImage", label: "Imagem de Fundo", type: "image" },
        { name: "logoUrl", label: "Logo", type: "image" },
      ],
    },
    {
      id: "simple_white_1_intro",
      name: "Introdução (Cor de Destaque)",
      type: "intro",
      fields: [
        { name: "texto1", label: "Título", type: "text", required: true },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
      ],
    },
    {
      id: "simple_white_1_slide_1",
      name: "Conteúdo (Esquerda)",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text", required: true },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
      ],
    },
    {
      id: "simple_white_1_slide_2",
      name: "Conteúdo com Imagem (Topo)",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text", required: true },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        {
          name: "backgroundImage",
          label: "Imagem de Cabeçalho",
          type: "image",
        },
      ],
    },
    {
      id: "simple_white_1_slide_3",
      name: "Conteúdo (Direita)",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text", required: true },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
      ],
    },
    {
      id: "simple_white_1_slide_4",
      name: "Conteúdo com Avatar",
      type: "content",
      fields: [
        { name: "texto1", label: "Título", type: "text", required: true },
        { name: "texto2", label: "Texto Completo", type: "textarea" },
        { name: "texto3", label: "Autor/Crédito", type: "text" },
        { name: "authorImage", label: "Foto do Autor", type: "image" },
      ],
    },
    {
      id: "simple_white_1_slide_5",
      name: "Conteúdo com Pessoa Recortada",
      type: "content",
      fields: [
        { name: "texto1", label: "Categoria/Tag", type: "text" },
        { name: "texto2", label: "Título", type: "text", required: true },
        { name: "texto3", label: "Texto Completo", type: "textarea" },
        { name: "personImage", label: "Imagem da Pessoa (PNG)", type: "image" },
      ],
    },
    {
      id: "simple_white_1_cta",
      name: "Chamada para Ação (CTA)",
      type: "cta",
      fields: [
        {
          name: "texto1",
          label: "Chamada Principal",
          type: "text",
          required: true,
        },
        { name: "texto2", label: "Subtítulo/Instrução", type: "text" },
        { name: "backgroundImage", label: "Imagem Circular", type: "image" },
      ],
    },
  ],
  theme: {
    colors: [
      { name: "cor_primaria", label: "Cor de Destaque", default: "#2563eb" },
    ],
    fonts: [
      {
        name: "fonte",
        label: "Família de Fonte dos títulos",
        default: "Inter",
      },
      {
        name: "fonte2",
        label: "Família de Fonte dos textos",
        default: "Inter",
      },
    ],
  },
};
