const { z } = require("zod");

/**
 * Schema Zod de validação para cadastro de usuário.
 * Valida campos obrigatórios, aplica confirmação de senha
 * e utiliza modo strict para rejeitar propriedades inesperadas.
 * O campo 'role' é intencionalmente excluído para prevenir escalação de privilégios.
 */
const createUserSchema = z
  .object({
    firstname: z.string({ required_error: "Nome é obrigatório" }).min(1, "Nome é obrigatório").max(50, "Nome deve ter no máximo 50 caracteres"),

    surname: z.string({ required_error: "Sobrenome é obrigatório" }).min(1, "Sobrenome é obrigatório").max(50, "Sobrenome deve ter no máximo 50 caracteres"),

    email: z.string({ required_error: "Email é obrigatório" }).email("Email inválido"),

    password: z.string({ required_error: "Senha é obrigatória" }).min(6, "Senha deve ter no mínimo 6 caracteres").max(100, "Senha deve ter no máximo 100 caracteres"),

    confirmPassword: z
      .string({ required_error: "Confirmação de senha é obrigatória" })
      .min(6, "Confirmação de senha é obrigatória")
      .max(100, "Confirmação de senha deve ter no máximo 100 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .strict();

/**
 * Middleware Express que valida o body da requisição contra o createUserSchema.
 * Retorna 400 com erros por campo se a validação falhar, caso contrário segue para o próximo handler.
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const createUserValidator = (req, res, next) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { createUserValidator };
