const { z } = require("zod");

/**
 * Schema Zod para a resposta de listagem do carrinho.
 * Filtra e valida os dados retornados pela API.
 * @type {import('zod').ZodObject}
 */
const cartItemResponseSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int(),
  selected_color: z.string().nullable().optional(),
  selected_size: z.string().nullable().optional(),
  product: z
    .object({
      id: z.number().int(),
      name: z.string(),
      slug: z.string(),
      price: z.number(),
      price_with_discount: z.number(),
      stock: z.number(),
      enabled: z.boolean(),
      images: z
        .array(
          z.object({
            id: z.number().int(),
            path: z.string(),
            enabled: z.boolean(),
          }),
        )
        .optional(),
    })
    .optional(),
});

const cartResponseSchema = z.object({
  items: z.array(cartItemResponseSchema),
});

/**
 * DTO de resposta para listagem do carrinho.
 * Normaliza dados do Sequelize e aplica o schema de validação.
 */
const listCartResponseDto = {
  /**
   * Transforma o payload do carrinho em resposta segura para a API.
   * @param {Object} payload - Objeto contendo items do carrinho.
   * @returns {Object} Dados filtrados pelo schema Zod.
   */
  toResponse(payload) {
    const items = (payload.items || []).map((item) => {
      const safeItem = typeof item.toJSON === "function" ? item.toJSON() : item;
      return safeItem;
    });
    return { cart: cartResponseSchema.parse({ items }) };
  },
};

module.exports = listCartResponseDto;
