const { z } = require("zod");

/**
 * Schema Zod para a resposta de busca de categoria por ID.
 * Filtra apenas os campos seguros para exposição na API.
 * @type {import('zod').ZodObject}
 */
const getCategoryByIdResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  use_in_menu: z.coerce.boolean(),
});

/**
 * DTO de resposta para busca de categoria por ID.
 * Garante que apenas os campos definidos no schema sejam retornados.
 */
const GetCategoryByIdResponseDto = {
  /**
   * Transforma o payload da categoria em resposta segura.
   * @param {Object} payload - Dados brutos da categoria (model Sequelize).
   * @returns {Object} Dados filtrados pelo schema Zod.
   */
  toResponse(payload) {
    return getCategoryByIdResponseSchema.parse(payload);
  },
};

module.exports = GetCategoryByIdResponseDto;
