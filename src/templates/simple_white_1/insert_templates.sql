-- =====================================================
-- SQL para inserir templates da família simple_white_1
-- Tabela: social_media_templates
-- =====================================================
-- IMPORTANTE: Execute em ordem! Primeiro a família, depois os slides.

-- =====================================================
-- 1. FAMÍLIA (PAI) - Simple White
-- =====================================================
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags
)
VALUES (
  'Simple White',
  'Um tema clean, elegante e minimalista com fundo branco e tipografia sofisticada. Ideal para conteúdos profissionais e educativos.',
  'simple_white_1',
  'simple_white_1',
  'FAMILY',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  false,
  true,
  'public',
  true,
  '[]'::jsonb,
  '{}'::jsonb,
  8,
  '{
    "theme": {
      "fonts": [
        {"name": "fonte", "label": "Família de Fonte", "default": "Inter"}
      ],
      "colors": [
        {"name": "cor_primaria", "label": "Cor de Destaque", "default": "#2563eb"},
        {"name": "cor_titulo", "label": "Cor do Título", "default": "#1a1a1a"},
        {"name": "cor_texto", "label": "Cor do Texto", "default": "#4a4a4a"},
        {"name": "background_color", "label": "Cor de Fundo", "default": "#ffffff"}
      ],
      "globals": [
        {"name": "logoUrl", "type": "logo", "label": "Logo"}
      ]
    },
    "previews": {
      "cover": "/images/previews/simple_white_1_cover.jpg",
      "intro": "/images/previews/simple_white_1_intro.jpg",
      "slide_1": "/images/previews/simple_white_1_slide_1.jpg",
      "slide_2": "/images/previews/simple_white_1_slide_2.jpg",
      "slide_3": "/images/previews/simple_white_1_slide_3.jpg",
      "slide_4": "/images/previews/simple_white_1_slide_4.jpg",
      "slide_5": "/images/previews/simple_white_1_slide_5.jpg",
      "cta": "/images/previews/simple_white_1_cta.jpg"
    }
  }'::jsonb,
  ARRAY['clean', 'minimal', 'professional', 'white', 'elegant']
);

-- Salvar o ID da família para usar nos filhos
-- Execute este SELECT e use o UUID retornado nas próximas queries
SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY';

-- =====================================================
-- 2. SLIDES FILHOS
-- Substitua 'FAMILY_UUID_HERE' pelo UUID retornado acima
-- =====================================================

-- 2.1 COVER - Capa com Imagem Lateral
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id
)
VALUES (
  'Simple White - Capa',
  'Slide de abertura com imagem lateral e tipografia elegante',
  'simple_white_1/simple_white_1_cover',
  'simple_white_1',
  'COVER',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título Principal",
      "required": true,
      "prompt": "Crie um título impactante e direto para a capa do carrossel. Máximo 60 caracteres. Deve capturar a essência do tema e gerar curiosidade."
    },
    {
      "name": "texto2",
      "type": "text",
      "label": "Subtítulo/Tema",
      "prompt": "Crie um subtítulo curto que contextualize o tema do carrossel. Máximo 30 caracteres. Ex: Growth Hacking, Marketing Digital."
    },
    {
      "name": "backgroundImage",
      "type": "image",
      "label": "Imagem de Fundo",
      "prompt": "Descreva uma imagem profissional adequada ao tema. A imagem ficará na lateral esquerda do slide."
    },
    {
      "name": "logoUrl",
      "type": "image",
      "label": "Logo"
    }
  ]'::jsonb,
  '{
    "texto1": "Como Aumentar sua Produtividade em 10x",
    "texto2": "Gestão de Tempo",
    "backgroundImage": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=1350&fit=crop",
    "logoUrl": ""
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'capa', 'white'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY')
);

-- 2.2 INTRO - Introdução com Cor de Destaque
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id
)
VALUES (
  'Simple White - Introdução',
  'Slide de introdução com fundo colorido e glassmorphism elegante',
  'simple_white_1/simple_white_1_intro',
  'simple_white_1',
  'INTRO',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título introdutório que prepare o leitor para o conteúdo. Máximo 40 caracteres. Deve ser convidativo e gerar expectativa."
    },
    {
      "name": "texto2",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Escreva um parágrafo introdutório de 2-3 frases (máximo 200 caracteres) que contextualize o tema e explique o que o leitor vai aprender. Tom profissional e engajador."
    }
  ]'::jsonb,
  '{
    "texto1": "Por que você precisa saber disso?",
    "texto2": "A maioria das pessoas desperdiça 3 horas por dia em tarefas desnecessárias. Vou te mostrar como recuperar esse tempo.",
    "slide_number": "01"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'intro', 'colorful'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY')
);

-- 2.3 SLIDE 1 - Conteúdo Alinhado à Esquerda
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id, max_uses_per_carousel
)
VALUES (
  'Simple White - Conteúdo Esquerda',
  'Slide de conteúdo com texto alinhado à esquerda e barra colorida de destaque',
  'simple_white_1/simple_white_1_slide_1',
  'simple_white_1',
  'CONTENT',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título claro e direto para este ponto do conteúdo. Máximo 50 caracteres. Pode incluir numeração se fizer parte de uma sequência."
    },
    {
      "name": "texto2",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Seja específico, use dados ou exemplos quando relevante. Tom educativo e profissional."
    }
  ]'::jsonb,
  '{
    "texto1": "Priorize as tarefas importantes",
    "texto2": "Use a matriz de Eisenhower para separar o que é urgente do que é importante. Foque primeiro nas tarefas de alto impacto e delegue ou elimine o resto.",
    "slide_number": "02"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'content', 'white'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY'),
  3
);

-- 2.4 SLIDE 2 - Conteúdo com Imagem no Topo
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id, max_uses_per_carousel
)
VALUES (
  'Simple White - Conteúdo com Imagem',
  'Slide de conteúdo com imagem destacada no topo e texto abaixo',
  'simple_white_1/simple_white_1_slide_2',
  'simple_white_1',
  'CONTENT',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título que complemente a imagem. Máximo 50 caracteres. Deve destacar a ideia principal do slide."
    },
    {
      "name": "texto2",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Relacione com a imagem quando possível. Tom educativo e profissional."
    },
    {
      "name": "backgroundImage",
      "type": "image",
      "label": "Imagem de Cabeçalho",
      "prompt": "Descreva uma imagem horizontal que ilustre o conceito do slide. Será exibida no topo com bordas arredondadas."
    }
  ]'::jsonb,
  '{
    "texto1": "Ambiente organizado, mente focada",
    "texto2": "Um espaço de trabalho limpo reduz distrações visuais e permite que seu cérebro se concentre no que realmente importa.",
    "backgroundImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&h=550&fit=crop",
    "slide_number": "03"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'content', 'image'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY'),
  2
);

-- 2.5 SLIDE 3 - Conteúdo Alinhado à Direita
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id, max_uses_per_carousel
)
VALUES (
  'Simple White - Conteúdo Direita',
  'Slide de conteúdo com texto alinhado à direita para variação visual',
  'simple_white_1/simple_white_1_slide_3',
  'simple_white_1',
  'CONTENT',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título claro para este ponto do conteúdo. Máximo 50 caracteres. Deve ser direto e destacar a ideia principal."
    },
    {
      "name": "texto2",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Use dados ou exemplos práticos. Tom educativo e profissional."
    }
  ]'::jsonb,
  '{
    "texto1": "Blocos de tempo focado",
    "texto2": "A técnica Pomodoro funciona: 25 minutos de foco total, 5 minutos de pausa. Seu cérebro precisa de intervalos para consolidar o aprendizado.",
    "slide_number": "04"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'content', 'white'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY'),
  3
);

-- 2.6 SLIDE 4 - Conteúdo com Avatar
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id, max_uses_per_carousel
)
VALUES (
  'Simple White - Conteúdo com Avatar',
  'Slide de conteúdo centralizado com foto de perfil, ideal para citações e depoimentos',
  'simple_white_1/simple_white_1_slide_4',
  'simple_white_1',
  'CONTENT',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título para este slide. Máximo 50 caracteres. Ideal para citações ou insights pessoais."
    },
    {
      "name": "texto2",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Pode ser uma citação, insight ou reflexão. Tom pessoal e autêntico."
    },
    {
      "name": "texto3",
      "type": "text",
      "label": "Autor/Crédito",
      "prompt": "Nome do autor ou fonte. Máximo 30 caracteres."
    },
    {
      "name": "authorImage",
      "type": "image",
      "label": "Foto do Autor"
    }
  ]'::jsonb,
  '{
    "texto1": "A chave está na consistência",
    "texto2": "Pequenas ações diárias geram resultados extraordinários ao longo do tempo. Não busque perfeição, busque progresso.",
    "texto3": "Maria Silva",
    "authorImage": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    "slide_number": "05"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'content', 'testimonial', 'avatar'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY'),
  2
);

-- 2.7 SLIDE 5 - Conteúdo com Pessoa Recortada
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id, max_uses_per_carousel
)
VALUES (
  'Simple White - Conteúdo com Pessoa',
  'Slide de conteúdo com imagem de pessoa recortada (PNG) na lateral',
  'simple_white_1/simple_white_1_slide_5',
  'simple_white_1',
  'CONTENT',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Categoria/Tag",
      "prompt": "Crie uma tag ou categoria curta. Máximo 20 caracteres. Ex: DICA PRO, ESTRATÉGIA, CASE."
    },
    {
      "name": "texto2",
      "type": "text",
      "label": "Título",
      "required": true,
      "prompt": "Crie um título impactante. Máximo 50 caracteres."
    },
    {
      "name": "texto3",
      "type": "textarea",
      "label": "Texto Completo",
      "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Foco em storytelling ou case prático. Tom engajador."
    },
    {
      "name": "personImage",
      "type": "image",
      "label": "Imagem da Pessoa (PNG)",
      "prompt": "Imagem PNG de pessoa com fundo transparente, proporção vertical 2:4."
    }
  ]'::jsonb,
  '{
    "texto1": "DICA PRO",
    "texto2": "Automatize tarefas repetitivas",
    "texto3": "Use ferramentas como Zapier ou Make para automatizar processos manuais. O tempo investido na configuração se paga em semanas.",
    "personImage": "https://www.pikpng.com/pngl/b/200-2006565_hombre-png-305777-pessoa-em-p-png-clipart.png",
    "slide_number": "06"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'content', 'personal', 'cutout'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY'),
  2
);

-- 2.8 CTA - Chamada para Ação
INSERT INTO social_media_templates (
  name, description, template_path, family_id, component_type,
  template_type, origin_type, width, height, aspect_ratio,
  is_carousel_component, is_global, visibility, is_active,
  dynamic_fields, default_values, slide_count, structure,
  vibe_tags, parent_template_id
)
VALUES (
  'Simple White - CTA',
  'Slide de chamada para ação com ícones circulares de engajamento',
  'simple_white_1/simple_white_1_cta',
  'simple_white_1',
  'ENDING',
  'carousel',
  'official',
  1080,
  1350,
  '4:5',
  true,
  true,
  'public',
  true,
  '[
    {
      "name": "texto1",
      "type": "text",
      "label": "Chamada Principal",
      "required": true,
      "prompt": "Crie uma chamada para ação direta e persuasiva. Máximo 40 caracteres. Ex: Gostou dessas dicas?, Salve este post!"
    },
    {
      "name": "texto2",
      "type": "text",
      "label": "Subtítulo/Instrução",
      "prompt": "Instrução complementar ou benefício de seguir a ação. Máximo 80 caracteres."
    },
    {
      "name": "backgroundImage",
      "type": "image",
      "label": "Imagem Circular"
    }
  ]'::jsonb,
  '{
    "texto1": "Gostou do conteúdo?",
    "texto2": "Salve para consultar depois e compartilhe com quem precisa!",
    "backgroundImage": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop"
  }'::jsonb,
  1,
  null,
  ARRAY['clean', 'minimal', 'cta', 'engagement', 'final'],
  (SELECT id FROM social_media_templates WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY')
);

-- =====================================================
-- Verificar inserções
-- =====================================================
SELECT 
  name, 
  component_type, 
  CASE WHEN parent_template_id IS NULL THEN 'FAMÍLIA' ELSE 'FILHO' END as tipo
FROM social_media_templates 
WHERE family_id = 'simple_white_1' 
ORDER BY component_type = 'FAMILY' DESC, component_type;
