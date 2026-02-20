const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

/**
 * Service responsável pela busca de um usuário por ID.
 * Aplica regras de autorização com base na role do usuário autenticado.
 */
class GetUserByIdService {
  /**
   * Busca um registro de usuário com base nas regras de autorização:
   * - ADMIN: pode buscar qualquer usuário.
   * - USER: pode buscar apenas o próprio perfil.
   * @param {Object} params - Parâmetros da operação.
   * @param {string} params.targetUserId - UUID do usuário a ser buscado.
   * @param {Object} params.loggedUser - Payload do token do usuário autenticado.
   * @param {string} params.loggedUser.sub - ID do usuário autenticado.
   * @param {string} params.loggedUser.role - Role do usuário autenticado (ADMIN | USER).
   * @returns {Promise<Object>} O registro do usuário encontrado.
   * @throws {AppError} 403 - Se o usuário não tem permissão para esta ação.
   * @throws {AppError} 404 - Se o usuário alvo não existe.
   */
  async execute({ targetUserId, loggedUser }) {
    if (loggedUser.role === "ADMIN") {
      const user = await userRepository.findById(targetUserId);
      if (!user) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }
      return user;
    }

    if (String(loggedUser.sub) === String(targetUserId)) {
      const user = await userRepository.findById(targetUserId);
      if (!user) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }
      return user;
    }

    throw new AppError("Acesso negado ou recurso não disponível.", 403);
  }
}

module.exports = new GetUserByIdService();
