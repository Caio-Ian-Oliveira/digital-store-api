const { z } = require("zod");

/**
 * Schema Zod de validação para criação de categoria.
 * Utiliza modo strict para rejeitar propriedades inesperadas.
 */
const createCategorySchema = z
  .object({
    name: z
      .string({ required_error: "Nome é obrigatório" })
      .min(1, "Nome é obrigatório")
      .max(50, "Nome deve ter no máximo 50 caracteres"),
    slug: z
      .string({ required_error: "Slug é obrigatório" })
      .min(1, "Slug é obrigatório")
      .max(50, "Slug deve ter no máximo 50 caracteres"),
    use_in_menu: z.boolean().optional(),
  })
  .strict();

/**
 * Middleware Express que valida o body da requisição contra o createCategorySchema.
 * Retorna 400 com erros por campo se a validação falhar.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const createCategoryValidator = (req, res, next) => {
  const result = createCategorySchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { createCategoryValidator };
