const { z } = require("zod");

/**
 * Schema Zod de validação para exclusão de categoria.
 * Valida o parâmetro de rota (UUID obrigatório).
 * @type {import('zod').ZodObject}
 */
const deleteCategorySchema = z.object({
  id: z.uuid({ message: "ID deve ser um UUID válido" }),
});

/**
 * Middleware Express que valida os parâmetros de rota contra o deleteCategorySchema.
 * Retorna 400 com erros por campo se a validação falhar.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const deleteCategoryValidator = (req, res, next) => {
  const result = deleteCategorySchema.safeParse(req.params);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { deleteCategoryValidator };
