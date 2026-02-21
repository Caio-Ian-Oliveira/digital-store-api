const { z } = require("zod");

/**
 * Schema Zod para a resposta de atualização de categoria.
 * Filtra apenas os campos seguros para exposição na API.
 * @type {import('zod').ZodObject}
 */
const updateCategoryResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  use_in_menu: z.coerce.boolean(),
});

/**
 * DTO de resposta para atualização de categorias.
 * Garante que apenas os campos definidos no schema sejam retornados.
 */
const UpdateCategoryResponseDto = {
  /**
   * Transforma o payload da categoria atualizada em resposta segura.
   * @param {Object} payload - Dados brutos da categoria (model Sequelize).
   * @returns {Object} Dados filtrados pelo schema Zod.
   */
  toResponse(payload) {
    return updateCategoryResponseSchema.parse(payload);
  },
};

module.exports = UpdateCategoryResponseDto;
