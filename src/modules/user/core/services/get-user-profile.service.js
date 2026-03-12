const AppError = require("../../../../shared/errors/app-error");
const UserRepository = require("../../persistence/user.repository");

/**
 * Serviço responsável por buscar o perfil completo do usuário autenticado.
 */
class GetUserProfileService {
  /**
   * Retorna os dados pessoais + primeiro endereço do usuário.
   * @param {string} userId - UUID do usuário logado.
   * @returns {Promise<Object>} Dados do usuário com endereço.
   * @throws {AppError} 404 se o usuário não for encontrado.
   */
  async execute(userId) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return user;
  }
}

module.exports = new GetUserProfileService();
