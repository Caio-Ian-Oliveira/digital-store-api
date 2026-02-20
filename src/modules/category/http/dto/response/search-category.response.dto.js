const { z } = require("zod");

/**
 * Schema Zod para um item de categoria na listagem.
 * Todos os campos são opcionais pois a projeção pode limitar os campos retornados.
 * @type {import('zod').ZodObject}
 */
const categoryItemSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    use_in_menu: z.coerce.boolean().optional(),
  })
  .partial();

/**
 * Schema Zod para a resposta paginada de busca de categorias.
 * Inclui os metadados de paginação (total, limit, page).
 * @type {import('zod').ZodObject}
 */
const searchResponseSchema = z.object({
  data: z.array(categoryItemSchema),
  total: z.coerce.number().int().default(0),
  limit: z.coerce.number().int().default(12),
  page: z.coerce.number().int().min(1).default(1),
});

/**
 * DTO de resposta para busca paginada de categorias.
 * Normaliza os dados do Sequelize e aplica o schema de validação.
 */
const searchCategoryResponseDto = {
  /**
   * Transforma o payload da busca em resposta segura e paginada.
   * @param {Object} payload - Dados brutos do serviço de busca.
   * @param {Object[]} payload.data - Array de categorias (models Sequelize ou objetos puros).
   * @param {number} payload.total - Total de registros encontrados.
   * @param {number} payload.limit - Limite de itens por página.
   * @param {number} payload.page - Página atual.
   * @returns {Object} Dados filtrados e paginados pelo schema Zod.
   */
  toResponse(payload) {
    // Normalização defensiva: converte models Sequelize para objetos puros
    const safePayload = {
      data: payload.data?.map((item) => (typeof item.toJSON === "function" ? item.toJSON() : item)) || [],
      total: payload.total,
      limit: payload.limit,
      page: payload.page,
    };

    return searchResponseSchema.parse(safePayload);
  },
};

module.exports = searchCategoryResponseDto;
