const userRepository = require("../../persistence/user.repository");

class DeleteUserService {
    async execute({ targetUserId, loggedUser }) {
        // Admin pode deletar qualquer usuário, exceto a si mesmo
        if (loggedUser.role === "ADMIN") {
            if (String(loggedUser.sub) === String(targetUserId)) {
                throw new Error("Acesso negado ou recurso não disponível.");
            }

            const deleted = await userRepository.softDelete(targetUserId);
            if (!deleted) {
                throw new Error("Acesso negado ou recurso não disponível.");
            }

            return { message: "Usuário deletado com sucesso." };
        }

        // User só pode deletar a própria conta
        if (String(loggedUser.sub) === String(targetUserId)) {
            const deleted = await userRepository.softDelete(targetUserId);
            if (!deleted) {
                throw new Error("Acesso negado ou recurso não disponível.");
            }
            return { message: "Usuário deletado com sucesso." };
        }

        // Qualquer outro caso: acesso negado
        throw new Error("Acesso negado ou recurso não disponível.");
    }
}

module.exports = new DeleteUserService();