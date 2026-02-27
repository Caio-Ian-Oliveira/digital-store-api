const { z } = require("zod");

/**
 * Schema Zod de validação para atualização de item do carrinho.
 * Valida params.itemId (UUID) e body.quantity (inteiro ≥ 1).
 * @type {import('zod').ZodObject}
 */
const updateCartItemParamsSchema = z.object({
  itemId: z.string().uuid({ message: "itemId deve ser um UUID válido" }),
});

const updateCartItemBodySchema = z.object({
  quantity: z.coerce.number().int().min(1, { message: "quantity deve ser no mínimo 1" }),
});

/**
 * Middleware Express que valida params e body para PUT /v1/cart/update/:itemId.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const updateCartItemValidator = (req, res, next) => {
  const paramsResult = updateCartItemParamsSchema.safeParse(req.params);
  const bodyResult = updateCartItemBodySchema.safeParse(req.body);

  const errors = [];

  if (!paramsResult.success) {
    errors.push(
      ...paramsResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    );
  }

  if (!bodyResult.success) {
    errors.push(
      ...bodyResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.params.itemId = paramsResult.data.itemId;
  req.body = bodyResult.data;
  next();
};

module.exports = { updateCartItemValidator };
