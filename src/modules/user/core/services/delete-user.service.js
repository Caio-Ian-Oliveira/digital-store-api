const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

class DeleteUserService {
    async execute({ targetUserId, loggedUser }) {
        // Admin pode deletar qualquer usuário, exceto a si mesmo
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

        // User só pode deletar a própria conta
        if (String(loggedUser.sub) === String(targetUserId)) {
            const deleted = await userRepository.softDelete(targetUserId);
            if (!deleted) {
                throw new AppError("Acesso negado ou recurso não disponível.", 404);
            }
            return { message: "Usuário deletado com sucesso." };
        }

        // Qualquer outro caso: acesso negado
        throw new AppError("Acesso negado ou recurso não disponível.", 403);
    }
}

module.exports = new DeleteUserService();