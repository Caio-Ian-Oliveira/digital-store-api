const { z } = require("zod");

/**
 * Schema Zod de validação para atualização de categoria.
 * Utiliza modo strict para rejeitar propriedades inesperadas.
 */
const updateCategorySchema = z
  .object({
    name: z.string({ required_error: "Nome é obrigatório" }).min(2, "Nome é obrigatório").max(50, "Nome deve ter no máximo 50 caracteres"),
    slug: z.string({ required_error: "Slug é obrigatório" }).min(2, "Slug é obrigatório").max(50, "Slug deve ter no máximo 50 caracteres"),
    use_in_menu: z.boolean({ required_error: "Uso no menu é obrigatório" }),
  })
  .strict();

/**
 * Middleware Express que valida o body da requisição contra o updateCategorySchema.
 * Retorna 400 com erros por campo se a validação falhar.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const updateCategoryValidator = (req, res, next) => {
  const result = updateCategorySchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { updateCategoryValidator };
