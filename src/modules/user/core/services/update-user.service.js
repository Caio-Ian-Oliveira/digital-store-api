const AppError = require("../../../../shared/errors/app-error");
const userRepository = require("../../persistence/user.repository");

/**
 * Service responsável pela atualização de dados do perfil de usuário.
 * Aplica regras de autorização com base na role do usuário autenticado.
 */
class UpdateUserService {
  /**
   * Atualiza o perfil de um usuário com base nas regras de autorização:
   * - ADMIN: pode atualizar qualquer usuário.
   * - USER: pode atualizar apenas o próprio perfil.
   * @param {string} targetUserId - UUID do usuário a ser atualizado.
   * @param {Object} loggedUser - Payload do token do usuário autenticado.
   * @param {string} loggedUser.sub - ID do usuário autenticado.
   * @param {string} loggedUser.role - Role do usuário autenticado (ADMIN | USER).
   * @param {Object} updateData - Campos a serem atualizados (firstname, surname).
   * @returns {Promise<Object>} O registro do usuário atualizado.
   * @throws {AppError} 403 - Se o usuário não tem permissão para esta ação.
   * @throws {AppError} 404 - Se o usuário alvo não existe.
   */
  async execute(targetUserId, loggedUser, updateData) {
    if (loggedUser.role === "ADMIN") {
      const user = await userRepository.updateUser(targetUserId, updateData);
      if (!user) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }
      return user;
    }

    if (String(loggedUser.sub) === String(targetUserId)) {
      const user = await userRepository.updateUser(targetUserId, updateData);
      if (!user) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }
      return user;
    }

    throw new AppError("Acesso negado ou recurso não disponível.", 403);
  }
}

module.exports = new UpdateUserService();
