const { z } = require("zod");

/**
 * Schema Zod de validação para adição de produto ao carrinho.
 * Valida o body da requisição POST /v1/cart/add.
 * @type {import('zod').ZodObject}
 */
const addToCartSchema = z.object({
  product_id: z.coerce.number().int().positive({ message: "product_id deve ser um inteiro positivo" }),
  quantity: z.coerce.number().int().min(1, { message: "quantity deve ser no mínimo 1" }).default(1),
  selected_color: z.string().optional(),
  selected_size: z.string().optional(),
});

/**
 * Middleware Express que valida o body contra o addToCartSchema.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const addToCartValidator = (req, res, next) => {
  const result = addToCartSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  req.body = result.data;
  next();
};

module.exports = { addToCartValidator };
