const { z } = require("zod");

/**
 * Schema Zod de validação para busca de produto por ID.
 * Valida o parâmetro de rota (inteiro positivo obrigatório).
 * @type {import('zod').ZodObject}
 */
const getProductByIdSchema = z.object({
  id: z.coerce.number().int().positive({ message: "ID deve ser um inteiro positivo" }),
});

/**
 * Middleware Express que valida os parâmetros de rota contra o getProductByIdSchema.
 * O ID validado é reescrito em req.params.id como número.
 * Retorna 400 com erros por campo se a validação falhar.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const getProductByIdValidator = (req, res, next) => {
  const result = getProductByIdSchema.safeParse(req.params);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  req.params.id = result.data.id;
  next();
};

module.exports = { getProductByIdValidator };
