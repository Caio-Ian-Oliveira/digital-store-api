const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

/**
 * Service responsável pela exclusão (soft-delete) de usuários.
 * Aplica regras de autorização com base na role do usuário autenticado.
 */
class DeleteUserService {
  /**
   * Realiza o soft-delete de um usuário com base nas regras de autorização:
   * - ADMIN: pode deletar qualquer usuário, exceto a si mesmo.
   * - USER: pode deletar apenas a própria conta.
   * @param {Object} params - Parâmetros da operação.
   * @param {string} params.targetUserId - UUID do usuário a ser deletado.
   * @param {Object} params.loggedUser - Payload do token do usuário autenticado.
   * @param {string} params.loggedUser.sub - ID do usuário autenticado.
   * @param {string} params.loggedUser.role - Role do usuário autenticado (ADMIN | USER).
   * @returns {Promise<Object>} Mensagem de sucesso.
   * @throws {AppError} 403 - Se o usuário não tem permissão para esta ação.
   * @throws {AppError} 404 - Se o usuário alvo não existe.
   */
  async execute({ targetUserId, loggedUser }) {
    if (loggedUser.role === "ADMIN") {
      if (String(loggedUser.sub) === String(targetUserId)) {
        throw new AppError("Acesso negado ou recurso não disponível.", 403);
      }

      const deleted = await userRepository.softDelete(targetUserId);
      if (!deleted) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }

      return { message: "Usuário deletado com sucesso." };
    }

    if (String(loggedUser.sub) === String(targetUserId)) {
      const deleted = await userRepository.softDelete(targetUserId);
      if (!deleted) {
        throw new AppError("Acesso negado ou recurso não disponível.", 404);
      }
      return { message: "Usuário deletado com sucesso." };
    }

    throw new AppError("Acesso negado ou recurso não disponível.", 403);
  }
}

module.exports = new DeleteUserService();
