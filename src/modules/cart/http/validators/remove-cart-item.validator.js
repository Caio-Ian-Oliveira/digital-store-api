const { z } = require("zod");

/**
 * Schema Zod de validação para remoção de item do carrinho.
 * Valida o parâmetro de rota itemId como UUID.
 * @type {import('zod').ZodObject}
 */
const removeCartItemSchema = z.object({
  itemId: z.string().uuid({ message: "itemId deve ser um UUID válido" }),
});

/**
 * Middleware Express que valida params para DELETE /v1/cart/remove/:itemId.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const removeCartItemValidator = (req, res, next) => {
  const result = removeCartItemSchema.safeParse(req.params);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  req.params.itemId = result.data.itemId;
  next();
};

module.exports = { removeCartItemValidator };
