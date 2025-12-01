const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

/**
 * Serviço para gerenciar templates HTML
 */
class TemplateService {
  constructor() {
    this.templatesDir = path.join(__dirname, "../templates");
  }

  /**
   * Lista todos os templates disponíveis (recursivamente)
   * Retorna estrutura organizada se encontrar manifesto
   * @returns {Promise<Array>} - Lista de templates
   */
  async getAllTemplates() {
    try {
      // Verificar se existem subpastas com manifesto
      const entries = await fs.readdir(this.templatesDir, { withFileTypes: true });
      const directories = entries.filter(dirent => dirent.isDirectory() && !['demo'].includes(dirent.name));
      
      // Se encontrarmos diretórios de família (ex: new_minimalist)
      const families = [];
      
      for (const dir of directories) {
        const manifestPath = path.join(this.templatesDir, dir.name, 'manifest.js');
        try {
          await fs.access(manifestPath);
          // Carregar manifesto se existir
          const manifest = require(manifestPath);
          // Adicionar caminho relativo aos previews
          if (manifest.previews) {
             // Ajustar paths se necessário, mas o manifesto já deve ter caminhos públicos
          }
          families.push({
            type: 'family',
            ...manifest
          });
        } catch (e) {
          // Sem manifesto, ignorar ou tratar como pasta comum
        }
      }

      // Buscar arquivos soltos (legado)
      const files = await this.getFilesRecursively(this.templatesDir);
      const htmlFiles = files.filter((file) => file.endsWith(".html") && !file.includes('demo/')); // Ignorar pasta demo

      // Mapear informações dos templates soltos
      const templates = await Promise.all(
        htmlFiles.map(async (filePath) => {
          const stats = await fs.stat(filePath);
          const fileName = path.basename(filePath);
          const id = path.basename(filePath, ".html");
          const relativePath = path.relative(this.templatesDir, filePath);
          
          // Verificar se este arquivo pertence a uma família já listada
          const parentDir = path.dirname(relativePath).split(path.sep)[0];
          const isFamilyMember = families.some(f => f.id === parentDir);
          
          if (isFamilyMember) return null; // Pula se já está na família

          return {
            id: id,
            name: this.formatTemplateName(id),
            file: fileName,
            relativePath: relativePath,
            path: filePath,
            created: stats.birthtime,
            modified: stats.mtime,
            size: stats.size,
          };
        })
      );

      // Juntar famílias e templates soltos
      return [...families, ...templates.filter(Boolean)];
    } catch (error) {
      console.error("Erro ao listar templates:", error);
      throw new Error(`Falha ao listar templates: ${error.message}`);
    }
  }

  /**
   * Helper para listar arquivos recursivamente
   */
  async getFilesRecursively(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.join(dir, dirent.name);
        return dirent.isDirectory() ? this.getFilesRecursively(res) : res;
      })
    );
    return files.flat();
  }

  /**
   * Obtém um template pelo ID
   * @param {string} id - ID do template
   * @returns {Promise<Object>} - Informações do template
   */
  async getTemplateById(id) {
    try {
      // Tenta encontrar o arquivo
      // Primeiro, verifica se existe direto na raiz (comportamento antigo)
      let filePath = path.join(this.templatesDir, `${id}.html`);
      
      try {
        await fs.access(filePath);
      } catch (err) {
        // Se não achar na raiz, procura recursivamente
        const allFiles = await this.getFilesRecursively(this.templatesDir);
        const found = allFiles.find(file => path.basename(file, '.html') === id);
        
        if (found) {
          filePath = found;
        } else {
          throw new Error(`Template não encontrado: ${id}`);
        }
      }

      const fileName = path.basename(filePath);


      // Obter estatísticas do arquivo
      const stats = await fs.stat(filePath);

      // Ler o conteúdo do template
      const content = await fs.readFile(filePath, "utf-8");

      // Extrair placeholders do template
      const placeholders = this.extractPlaceholders(content);

      return {
        id,
        name: this.formatTemplateName(id),
        file: fileName,
        path: filePath,
        content,
        placeholders,
        created: stats.birthtime,
        modified: stats.mtime,
        size: stats.size,
      };
    } catch (error) {
      console.error(`Erro ao obter template ${id}:`, error);
      throw new Error(`Template não encontrado: ${error.message}`);
    }
  }

  /**
   * Cria um novo template
   * @param {string} name - Nome do template
   * @param {string} content - Conteúdo HTML do template
   * @returns {Promise<Object>} - Informações do template criado
   */
  async createTemplate(name, content) {
    try {
      // Gerar ID único se não fornecido
      const id = this.formatTemplateId(name);
      const fileName = `${id}.html`;
      const filePath = path.join(this.templatesDir, fileName);

      // Verificar se já existe um template com este nome
      try {
        await fs.access(filePath);
        throw new Error(`Já existe um template com o nome '${name}'`);
      } catch (err) {
        // Se o arquivo não existe, prosseguir com a criação
        if (err.code !== "ENOENT") {
          throw err;
        }
      }

      // Salvar o template
      await fs.writeFile(filePath, content, "utf-8");

      // Obter estatísticas do arquivo
      const stats = await fs.stat(filePath);

      // Extrair placeholders do template
      const placeholders = this.extractPlaceholders(content);

      return {
        id,
        name: this.formatTemplateName(id),
        file: fileName,
        path: filePath,
        content,
        placeholders,
        created: stats.birthtime,
        modified: stats.mtime,
        size: stats.size,
      };
    } catch (error) {
      console.error("Erro ao criar template:", error);
      throw new Error(`Falha ao criar template: ${error.message}`);
    }
  }

  /**
   * Atualiza um template existente
   * @param {string} id - ID do template
   * @param {string} content - Novo conteúdo HTML do template
   * @returns {Promise<Object>} - Informações do template atualizado
   */
  async updateTemplate(id, content) {
    try {
      const fileName = `${id}.html`;
      const filePath = path.join(this.templatesDir, fileName);

      // Verificar se o arquivo existe
      await fs.access(filePath);

      // Salvar o template atualizado
      await fs.writeFile(filePath, content, "utf-8");

      // Obter estatísticas do arquivo
      const stats = await fs.stat(filePath);

      // Extrair placeholders do template
      const placeholders = this.extractPlaceholders(content);

      return {
        id,
        name: this.formatTemplateName(id),
        file: fileName,
        path: filePath,
        content,
        placeholders,
        created: stats.birthtime,
        modified: stats.mtime,
        size: stats.size,
      };
    } catch (error) {
      console.error(`Erro ao atualizar template ${id}:`, error);
      throw new Error(`Falha ao atualizar template: ${error.message}`);
    }
  }

  /**
   * Exclui um template
   * @param {string} id - ID do template
   * @returns {Promise<boolean>} - True se excluído com sucesso
   */
  async deleteTemplate(id) {
    try {
      const fileName = `${id}.html`;
      const filePath = path.join(this.templatesDir, fileName);

      // Verificar se o arquivo existe
      await fs.access(filePath);

      // Excluir o arquivo
      await fs.unlink(filePath);

      return true;
    } catch (error) {
      console.error(`Erro ao excluir template ${id}:`, error);
      throw new Error(`Falha ao excluir template: ${error.message}`);
    }
  }

  /**
   * Extrai placeholders de um template
   * @param {string} content - Conteúdo HTML do template
   * @returns {Array<string>} - Lista de placeholders encontrados
   */
  extractPlaceholders(content) {
    const placeholderRegex = /{{([^}]+)}}/g;
    const placeholders = new Set();
    let match;

    while ((match = placeholderRegex.exec(content)) !== null) {
      placeholders.add(match[1]);
    }

    return Array.from(placeholders);
  }

  /**
   * Formata o nome de exibição do template
   * @param {string} id - ID do template
   * @returns {string} - Nome formatado
   */
  formatTemplateName(id) {
    return id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * Formata o ID do template a partir do nome
   * @param {string} name - Nome do template
   * @returns {string} - ID formatado
   */
  formatTemplateId(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
}

module.exports = new TemplateService();
