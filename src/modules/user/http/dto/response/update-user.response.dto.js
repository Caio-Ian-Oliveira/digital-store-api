const { z } = require("zod");

/** Schema Zod que define o formato da resposta de atualização de usuário. */
const updateUserResponseSchema = z.object({
  id: z.string().uuid(),
  firstname: z.string(),
  surname: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * DTO responsável por filtrar e validar o payload de resposta de atualização de usuário.
 * Garante que apenas campos permitidos sejam expostos ao cliente.
 */
const UpdateUserResponseDto = {
  /**
   * Transforma um registro bruto de usuário no formato padronizado da API.
   * @param {Object} payload - Dados brutos do usuário vindos da camada de service.
   * @returns {Object} Resposta filtrada com id, firstname, surname, email, createdAt e updatedAt.
   */
  toResponse(payload) {
    return updateUserResponseSchema.parse(payload);
  },
};

module.exports = UpdateUserResponseDto;
