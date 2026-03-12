const { z } = require("zod");

/**
 * Schema Zod para validação do body de atualização de endereço.
 * Campos em inglês conforme contrato do frontend.
 */
const updateUserAddressSchema = z
  .object({
    address: z
      .string({ required_error: "Endereço é obrigatório" })
      .min(1, "Endereço não pode ser vazio")
      .max(200, "Endereço deve ter no máximo 200 caracteres"),

    neighborhood: z
      .string({ required_error: "Bairro é obrigatório" })
      .min(1, "Bairro não pode ser vazio")
      .max(100, "Bairro deve ter no máximo 100 caracteres"),

    city: z
      .string({ required_error: "Cidade é obrigatória" })
      .min(1, "Cidade não pode ser vazia")
      .max(100, "Cidade deve ter no máximo 100 caracteres"),

    state: z
      .string({ required_error: "Estado é obrigatório" })
      .min(1, "Estado não pode ser vazio")
      .max(50, "Estado deve ter no máximo 50 caracteres"),

    cep: z
      .string({ required_error: "CEP é obrigatório" })
      .min(1, "CEP não pode ser vazio")
      .max(9, "CEP deve ter no máximo 9 caracteres"),

    complement: z
      .string()
      .max(200, "Complemento deve ter no máximo 200 caracteres")
      .optional()
      .default(""),
  })
  .strict();

/**
 * Middleware Express para validação do PUT /v1/user/address.
 */
const updateUserAddressValidator = (req, res, next) => {
  const result = updateUserAddressSchema.safeParse(req.body);

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

module.exports = { updateUserAddressValidator };
