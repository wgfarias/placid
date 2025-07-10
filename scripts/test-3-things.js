const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Configuração
const API_BASE_URL = "http://localhost:3000";
const TEMPLATE_NAME = "3_things";
const OUTPUT_DIR = "./rendered_examples";

// Dados de exemplo para o template carrossel
const carouselData = {
  template: TEMPLATE_NAME,
  slides: [
    {
      template: "3_things_slide_1",
      data: {
        title: "3 dicas para usar automação no seu negócio agora!",
        subtitle:
          "Descubra como implementar processos automatizados que vão transformar sua empresa",
        backgroundImage:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
        logo: "https://triaddigital.com.br/wp-content/uploads/2025/02/logo_positiva.svg",
        titleColor: "#ffffff",
        subtitleColor: "#e2e8f0",
        accentColor: "#667eea",
        titleFont: "Inter",
        titleTransform: "none",
      },
    },
    {
      template: "3_things_slide_2",
      data: {
        title: "1. Automatize suas Vendas",
        text: "Implemente chatbots e sistemas de CRM automatizados para nutrir leads e converter mais clientes. A automação de vendas pode aumentar sua conversão em até 300%.",
        text2:
          "Configure sequências de e-mail marketing, follow-ups automáticos e pipelines de vendas que trabalham 24/7 para você.",
        sidebarImage:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
        logo: "https://triaddigital.com.br/wp-content/uploads/2025/02/logo_negativa.svg",
        titleColor: "#2d3748",
        textColor: "#4a5568",
        accentColor: "#667eea",
        titleFont: "Inter",
        titleTransform: "none",
      },
    },
    {
      template: "3_things_slide_3",
      data: {
        title: "2. Otimize seu Atendimento",
        text: "Crie sistemas de suporte automatizados que respondem instantaneamente às dúvidas mais comuns dos seus clientes.",
        text2:
          "Integre WhatsApp Business, chatbots inteligentes e sistemas de tickets para um atendimento eficiente e escalável.",
        sidebarImage:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
        logo: "https://triaddigital.com.br/wp-content/uploads/2025/02/logo_negativa.svg",
        titleColor: "#2d3748",
        textColor: "#4a5568",
        accentColor: "#667eea",
        titleFont: "Inter",
        titleTransform: "none",
      },
    },
    {
      template: "3_things_slide_4",
      data: {
        title: "3. Automatize sua Gestão",
        text: "Integre todos os seus sistemas e processos em uma única plataforma. Desde controle financeiro até gestão de estoque, tudo pode ser automatizado para economizar tempo e reduzir erros.",
        logo: "https://triaddigital.com.br/wp-content/uploads/2025/02/logo_negativa.svg",
        titleColor: "#2d3748",
        textColor: "#4a5568",
        accentColor: "#667eea",
        titleFont: "Inter",
        titleTransform: "none",
      },
    },
    {
      template: "3_things_slide_5",
      data: {
        title: "Comece Hoje Mesmo!",
        subtitle: "Não deixe seus concorrentes saírem na frente",
        ctaText: "Fale Conosco",
        ctaColor: "#667eea",
        backgroundImage:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
        logo: "https://triaddigital.com.br/wp-content/uploads/2025/02/logo_positiva.svg",
        email: "contato@triaddigital.com.br",
        phone: "(11) 99999-9999",
        qrCodeUrl:
          "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://triaddigital.com.br",
        titleColor: "#ffffff",
        subtitleColor: "#e2e8f0",
        titleFont: "Inter",
        titleTransform: "none",
      },
    },
  ],
};

// Função para testar o template
async function testCarouselTemplate() {
  console.log("🚀 Iniciando teste do template carrossel 3_things...\n");

  try {
    // Criar diretório de saída se não existir
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log("📊 Dados do carrossel:");
    console.log(`   Template: ${carouselData.template}`);
    console.log(`   Slides: ${carouselData.slides.length}`);
    console.log("");

    // Testar geração do carrossel
    console.log("🎨 Gerando carrossel...");
    const response = await axios.post(
      `${API_BASE_URL}/api/images/generate-carousel`,
      carouselData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.API_KEY || "test-key",
        },
        responseType: "json",
      }
    );

    if (response.data && response.data.success) {
      console.log("✅ Carrossel gerado com sucesso!");
      console.log(`   ID do carrossel: ${response.data.carouselId}`);
      console.log(`   Slides gerados: ${response.data.slides.length}`);
      console.log("");

      // Salvar informações do carrossel
      const carouselInfo = {
        carouselId: response.data.carouselId,
        timestamp: new Date().toISOString(),
        template: TEMPLATE_NAME,
        slides: response.data.slides,
      };

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${TEMPLATE_NAME}_carousel_info.json`),
        JSON.stringify(carouselInfo, null, 2)
      );

      console.log("📁 Informações do carrossel salvas em:");
      console.log(
        `   ${path.join(OUTPUT_DIR, `${TEMPLATE_NAME}_carousel_info.json`)}`
      );
      console.log("");

      // Listar slides gerados
      console.log("🖼️  Slides gerados:");
      response.data.slides.forEach((slide, index) => {
        console.log(`   ${index + 1}. ${slide.template}: ${slide.imageUrl}`);
      });
    } else {
      console.error("❌ Erro na resposta da API:", response.data);
    }
  } catch (error) {
    console.error("❌ Erro ao testar template:", error.message);
    if (error.response) {
      console.error("   Status:", error.response.status);
      console.error("   Dados:", error.response.data);
    }
  }
}

// Função para testar slides individuais
async function testIndividualSlides() {
  console.log("\n🧪 Testando slides individuais...\n");

  for (let i = 0; i < carouselData.slides.length; i++) {
    const slide = carouselData.slides[i];

    try {
      console.log(`📋 Testando slide ${i + 1}: ${slide.template}`);

      const response = await axios.post(
        `${API_BASE_URL}/api/images/generate`,
        {
          template: slide.template,
          data: slide.data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.API_KEY || "test-key",
          },
          responseType: "json",
        }
      );

      if (response.data && response.data.imageUrl) {
        console.log(`✅ Slide ${i + 1} gerado: ${response.data.imageUrl}`);
      } else {
        console.log(`❌ Erro no slide ${i + 1}:`, response.data);
      }
    } catch (error) {
      console.error(`❌ Erro no slide ${i + 1}:`, error.message);
    }
  }
}

// Função para mostrar informações do template
function showTemplateInfo() {
  console.log("\n📋 Informações do Template 3_things");
  console.log("=====================================");
  console.log("");
  console.log("🎯 Propósito:");
  console.log(
    '   Template de carrossel para apresentações de "3 dicas" ou conteúdo similar'
  );
  console.log(
    "   Ideal para marketing digital, educação e apresentações corporativas"
  );
  console.log("");
  console.log("📐 Especificações:");
  console.log("   - Dimensões: 1080x1350px (formato Instagram Story/Reels)");
  console.log("   - 5 slides distintos com layouts únicos");
  console.log("   - Texto responsivo com clamp() para adaptação automática");
  console.log("   - Continuidade visual entre slides 2 e 3");
  console.log("   - Paleta de cores coesa e moderna");
  console.log("");
  console.log("🎨 Slides:");
  console.log("   1. Slide 1: Capa com título, subtítulo e imagem de fundo");
  console.log("   2. Slide 2: Conteúdo com sidebar direita (primeira dica)");
  console.log("   3. Slide 3: Conteúdo com sidebar esquerda (segunda dica)");
  console.log("   4. Slide 4: Layout centralizado (terceira dica)");
  console.log("   5. Slide 5: Fechamento com CTA, contato e QR code");
  console.log("");
  console.log("🔧 Uso:");
  console.log("   POST /api/images/generate-carousel");
  console.log("   Content-Type: application/json");
  console.log("   Body: estrutura JSON com dados dos 5 slides");
  console.log("");
}

// Executar testes
async function main() {
  console.log("🎨 PLACID API - Teste Template 3_things");
  console.log("=======================================\n");

  showTemplateInfo();

  const args = process.argv.slice(2);

  if (args.includes("--individual")) {
    await testIndividualSlides();
  } else if (args.includes("--info")) {
    // Apenas mostrar informações (já mostradas acima)
    return;
  } else {
    await testCarouselTemplate();

    if (args.includes("--full")) {
      await testIndividualSlides();
    }
  }

  console.log("\n✨ Teste concluído!");
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testCarouselTemplate,
  testIndividualSlides,
  carouselData,
};
