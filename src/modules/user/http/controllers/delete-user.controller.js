const DeleteUserService = require("../../core/services/delete-user.service")

class DeleteUserController {
    async handle(req, res) {
        try {
            const targetUserId = req.params.id;
            const loggedUser = req.user;
            const result = await DeleteUserService.execute({ targetUserId, loggedUser });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new DeleteUserController();