const { z } = require("zod");

/**
 * Schema Zod de validação para upload de imagem.
 * Valida que o tipo MIME é de imagem e que o conteúdo não está vazio.
 */
const uploadImageSchema = z.object({
  type: z.string({ required_error: "Tipo da imagem é obrigatório" }).refine((val) => val.startsWith("image/"), {
    message: "Tipo deve ser um MIME type de imagem válido (ex: image/png, image/jpeg)",
  }),
  content: z
    .string({ required_error: "Conteúdo da imagem é obrigatório" })
    .min(1, "Conteúdo da imagem não pode ser vazio"),
});

/**
 * Middleware Express que valida o body da requisição contra o uploadImageSchema.
 * Pula validação JSON se o upload for via arquivo (multer).
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express.
 */
const uploadImageValidator = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    return next();
  }

  const result = uploadImageSchema.safeParse(req.body);

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

module.exports = { uploadImageValidator };
