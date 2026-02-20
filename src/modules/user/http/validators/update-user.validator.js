const { z } = require("zod");

/**
 * Schema Zod de validação para atualização de perfil de usuário.
 * Permite atualizações parciais com campos opcionais de firstname e surname.
 * Utiliza modo strict para rejeitar propriedades inesperadas.
 */
const updateUserSchema = z
  .object({
    firstname: z
      .string({ required_error: "Nome é obrigatório" })
      .min(2, "Nome deve ter no mínimo 2 caracteres")
      .max(50, "Nome deve ter no máximo 50 caracteres")
      .optional(),
    surname: z
      .string({ required_error: "Sobrenome é obrigatório" })
      .min(2, "Sobrenome deve ter no mínimo 2 caracteres")
      .max(50, "Sobrenome deve ter no máximo 50 caracteres")
      .optional(),
  })
  .strict();

/**
 * Middleware Express que valida o body da requisição contra o updateUserSchema.
 * Retorna 400 com erros por campo se a validação falhar, caso contrário segue para o próximo handler.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const updateUserValidator = (req, res, next) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { updateUserValidator };
