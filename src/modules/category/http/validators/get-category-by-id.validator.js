const { z } = require("zod");

/**
 * Schema Zod de validação para busca de categoria por ID.
 * Valida o parâmetro de rota (UUID obrigatório).
 * @type {import('zod').ZodObject}
 */
const getCategoryByIdSchema = z.object({
  id: z.string().uuid({ message: "ID deve ser um UUID válido" }),
});

/**
 * Middleware Express que valida os parâmetros de rota contra o getCategoryByIdSchema.
 * Retorna 400 com erros por campo se a validação falhar.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const getCategoryByIdValidator = (req, res, next) => {
  const result = getCategoryByIdSchema.safeParse(req.params);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { getCategoryByIdValidator };
