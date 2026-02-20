const { z } = require("zod");

/**
 * Schema Zod de validação para autenticação de usuário.
 * Valida formato de e-mail e garante que a senha foi fornecida.
 * Utiliza modo strict para rejeitar propriedades inesperadas.
 */
const loginSchema = z
  .object({
    email: z.string({ required_error: "Email é obrigatório" }).email("Email inválido"),
    password: z.string({ required_error: "Senha é obrigatória" }).min(1, "Senha é obrigatória"),
  })
  .strict();

/**
 * Middleware Express que valida o body da requisição contra o loginSchema.
 * Retorna 400 com erros por campo se a validação falhar, caso contrário segue para o próximo handler.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const loginValidator = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { loginValidator };
