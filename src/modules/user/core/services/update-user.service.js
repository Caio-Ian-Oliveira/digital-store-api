const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

class UpdateUserService {
  async execute(targetUserId, loggedUser, updateData) {
    // Admin pode atualizar qualquer usuário
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
