const fs = require("fs").promises;
const path = require("path");
const puppeteer = require("puppeteer");

// Pegar o tema do argumento de linha de comando ou usar padrão
const THEME = process.argv[2] || "new_minimalist";

// Configuração
const DEMO_DIR = path.join(__dirname, `../src/templates/${THEME}/demo`);
const OUTPUT_DIR = path.join(__dirname, "../src/public/images/previews");
const VIEWPORT = { width: 1080, height: 1350 };

async function generatePreviews() {
  console.log(`🚀 Iniciando geração de previews para: ${THEME}...`);

  // Garantir que o diretório de saída existe
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
  });

  try {
    const files = await fs.readdir(DEMO_DIR);
    const htmlFiles = files.filter((f) => f.endsWith(".html"));

    for (const file of htmlFiles) {
      const name = path.basename(file, ".html");
      const filePath = path.join(DEMO_DIR, file);
      // Prefixo do tema para combinar com o ID do manifesto
      const outputName = `${THEME}_${name}.jpg`;
      const outputPath = path.join(OUTPUT_DIR, outputName);

      console.log(`📸 Gerando preview para: ${name}...`);

      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);

      // Carregar arquivo local via file:// para suportar imagens locais
      const fileUrl = `file://${filePath.replace(/\\/g, "/")}`;
      await page.goto(fileUrl, { waitUntil: "networkidle0" });

      // Screenshot
      await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 80,
      });

      console.log(`✅ Salvo em: ${outputName}`);
      await page.close();
    }
  } catch (error) {
    console.error("❌ Erro fatal:", error);
  } finally {
    await browser.close();
    console.log("✨ Processo finalizado!");
  }
}

generatePreviews();
