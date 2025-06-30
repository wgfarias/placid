const fetch = require("node-fetch");
const fs = require("fs");

/**
 * Serviço para upload de imagens para o servidor SNDT
 */
class UploadService {
  constructor() {
    this.sndtApiUrl =
      process.env.SNDT_API_URL ||
      "https://files.sndt.com.br/placid/api/upload-base64.php";
    this.apiToken = process.env.SNDT_API_TOKEN || "sndt_live_abc123def456";
    this.enabled = process.env.UPLOAD_TO_SNDT === "true";
    this.deleteLocalAfterUpload =
      process.env.DELETE_LOCAL_AFTER_UPLOAD === "true";
  }

  /**
   * Fazer upload de uma imagem para o servidor SNDT
   * @param {string} localImagePath - Caminho local da imagem
   * @param {string} fileName - Nome do arquivo de destino
   * @returns {Promise<Object>} - Resultado do upload
   */
  async uploadToSNDT(localImagePath, fileName) {
    if (!this.enabled) {
      throw new Error("Upload para SNDT está desabilitado");
    }

    try {
      console.log(`📤 Iniciando upload para SNDT: ${fileName}`);

      // Verificar se arquivo local existe
      if (!fs.existsSync(localImagePath)) {
        throw new Error(`Arquivo local não encontrado: ${localImagePath}`);
      }

      // Ler arquivo e converter para Base64
      const imageBuffer = await fs.readFileSync(localImagePath);
      const imageBase64 = imageBuffer.toString("base64");

      // Preparar dados JSON
      const uploadData = {
        image: imageBase64,
        filename: fileName,
        timestamp: new Date().toISOString(),
        source: "placid-api",
      };

      // Fazer requisição para API PHP
      const response = await fetch(this.sndtApiUrl, {
        method: "POST",
        body: JSON.stringify(uploadData),
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
          "Cache-Control": "no-cache",
        },
        timeout: 30000, // 30 segundos timeout
      });

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      // Parse da resposta JSON
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Falha no upload sem detalhes");
      }

      console.log(`✅ Upload realizado com sucesso: ${result.url}`);

      // Opcional: deletar arquivo local após upload bem-sucedido
      if (this.deleteLocalAfterUpload) {
        try {
          await fs.promises.unlink(localImagePath);
          console.log(`🗑️ Arquivo local removido: ${localImagePath}`);
        } catch (unlinkError) {
          console.warn(
            `⚠️ Falha ao remover arquivo local: ${unlinkError.message}`
          );
        }
      }

      return {
        success: true,
        url: result.url,
        filename: result.filename,
        size: result.size,
        type: result.type,
        uploaded_at: result.timestamp,
        uploaded_by: result.uploaded_by,
      };
    } catch (error) {
      console.error(`❌ Erro no upload para SNDT: ${error.message}`);

      // Re-throw com mais contexto
      throw new Error(`Falha no upload para SNDT: ${error.message}`);
    }
  }

  /**
   * Verificar se o upload está habilitado
   * @returns {boolean}
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Verificar conectividade com a API SNDT
   * @returns {Promise<boolean>}
   */
  async testConnection() {
    try {
      // Testar com a API test.php que sabemos que funciona
      const testUrl = this.sndtApiUrl.replace("upload-base64.php", "test.php");
      const response = await fetch(testUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 10000, // 10 segundos
      });

      // 200 com resposta JSON indica que está funcionando
      if (response.ok) {
        const data = await response.json();
        return data.status === "ok";
      }
      return false;
    } catch (error) {
      console.error("Erro ao testar conexão com SNDT:", error.message);
      return false;
    }
  }
}

module.exports = new UploadService();
