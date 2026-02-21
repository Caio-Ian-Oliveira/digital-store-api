const { z } = require("zod");

/** Schema Zod que define o formato da resposta de criação de usuário. */
const createUserResponseSchema = z.object({
  id: z.uuid(),
  firstname: z.string(),
  surname: z.string(),
  email: z.email(),
});

/**
 * DTO responsável por filtrar e validar o payload de resposta de criação de usuário.
 * Garante que apenas campos permitidos sejam expostos ao cliente.
 */
const CreateUserResponseDto = {
  /**
   * Transforma um registro bruto de usuário no formato padronizado da API.
   * @param {Object} payload - Dados brutos do usuário vindos da camada de service.
   * @returns {Object} Resposta filtrada contendo apenas id, firstname, surname e email.
   */
  toResponse(payload) {
    return createUserResponseSchema.parse(payload);
  },
};

module.exports = CreateUserResponseDto;
