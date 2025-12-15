-- ============================================
-- Script de Atualização: Simple White 1
-- Atualiza marcadores de imagem e remove cores fixas
-- ============================================

-- 1. Atualizar FAMILY - Remover cores de título/texto/fundo (agora são fixas no template)
UPDATE social_media_templates
SET structure = '{
  "theme": {
    "fonts": [
      {"name": "fonte", "label": "Família de Fonte dos títulos", "default": "Inter"},
      {"name": "fonte2", "label": "Família de Fonte dos textos", "default": "Inter"}
    ],
    "colors": [
      {"name": "cor_primaria", "label": "Cor de Destaque", "default": "#2563eb"}
    ],
    "globals": [
      {"name": "logoUrl", "type": "logo", "label": "Logo"}
    ]
  },
  "previews": {
    "cta": "/images/previews/simple_white_1_cta.jpg",
    "cover": "/images/previews/simple_white_1_cover.jpg",
    "intro": "/images/previews/simple_white_1_intro.jpg",
    "slide_1": "/images/previews/simple_white_1_slide_1.jpg",
    "slide_2": "/images/previews/simple_white_1_slide_2.jpg",
    "slide_3": "/images/previews/simple_white_1_slide_3.jpg",
    "slide_4": "/images/previews/simple_white_1_slide_4.jpg",
    "slide_5": "/images/previews/simple_white_1_slide_5.jpg"
  }
}'::jsonb,
updated_at = NOW()
WHERE family_id = 'simple_white_1' AND component_type = 'FAMILY';

-- 2. Atualizar slide_4 - Trocar authorImage por avatar
UPDATE social_media_templates
SET 
  dynamic_fields = '[
    {"name": "texto1", "type": "text", "label": "Título", "prompt": "Crie um título para este slide. Máximo 50 caracteres. Ideal para citações ou insights pessoais.", "required": true},
    {"name": "texto2", "type": "textarea", "label": "Texto Completo", "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Pode ser uma citação, insight ou reflexão. Tom pessoal e autêntico."},
    {"name": "texto3", "type": "text", "label": "Autor/Crédito", "prompt": "Nome do autor ou fonte. Máximo 30 caracteres."},
    {"name": "avatar", "type": "image", "label": "Foto do Autor (Avatar)"}
  ]'::jsonb,
  default_values = '{
    "texto1": "A chave está na consistência",
    "texto2": "Pequenas ações diárias geram resultados extraordinários ao longo do tempo. Não busque perfeição, busque progresso.",
    "texto3": "Maria Silva",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    "slide_number": "05"
  }'::jsonb,
  updated_at = NOW()
WHERE family_id = 'simple_white_1' AND template_path = 'simple_white_1/simple_white_1_slide_4';

-- 3. Atualizar slide_5 - Trocar personImage por recortada
UPDATE social_media_templates
SET 
  dynamic_fields = '[
    {"name": "texto1", "type": "text", "label": "Categoria/Tag", "prompt": "Crie uma tag ou categoria curta. Máximo 20 caracteres. Ex: DICA PRO, ESTRATÉGIA, CASE."},
    {"name": "texto2", "type": "text", "label": "Título", "prompt": "Crie um título impactante. Máximo 50 caracteres.", "required": true},
    {"name": "texto3", "type": "textarea", "label": "Texto Completo", "prompt": "Desenvolva o conteúdo em 2-4 frases (máximo 250 caracteres). Foco em storytelling ou case prático. Tom engajador."},
    {"name": "recortada", "type": "image", "label": "Imagem da Pessoa (Recortada)", "prompt": "Imagem de pessoa recortada com fundo transparente, proporção 3:4."}
  ]'::jsonb,
  default_values = '{
    "texto1": "DICA PRO",
    "texto2": "Automatize tarefas repetitivas",
    "texto3": "Use ferramentas como Zapier ou Make para automatizar processos manuais. O tempo investido na configuração se paga em semanas.",
    "recortada": "https://www.pikpng.com/pngl/b/200-2006565_hombre-png-305777-pessoa-em-p-png-clipart.png",
    "slide_number": "06"
  }'::jsonb,
  updated_at = NOW()
WHERE family_id = 'simple_white_1' AND template_path = 'simple_white_1/simple_white_1_slide_5';

-- Verificar atualizações
SELECT 
  name, 
  component_type, 
  template_path,
  dynamic_fields,
  updated_at
FROM social_media_templates 
WHERE family_id = 'simple_white_1'
ORDER BY component_type, name;

