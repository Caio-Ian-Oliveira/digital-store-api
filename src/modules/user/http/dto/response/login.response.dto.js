const { z } = require("zod");

/** Schema Zod que define o formato da resposta de login. */
const loginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string().uuid(),
    firstname: z.string(),
    surname: z.string(),
    email: z.string().email(),
  }),
});

/**
 * DTO responsável por filtrar e validar o payload de resposta de login.
 * Garante que apenas campos permitidos sejam expostos ao cliente.
 */
const LoginResponseDto = {
  /**
   * Transforma o resultado bruto do login no formato padronizado da API.
   * @param {Object} payload - Dados brutos do login contendo token e informações do usuário.
   * @returns {Object} Resposta filtrada contendo token e usuário (id, firstname, surname, email).
   */
  toResponse(payload) {
    return loginResponseSchema.parse(payload);
  },
};

module.exports = LoginResponseDto;
