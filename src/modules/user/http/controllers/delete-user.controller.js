const DeleteUserService = require("../../core/services/delete-user.service");

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário deletado com sucesso
 *       400:
 *         description: Erro ao remover usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * Controller responsável por processar requisições de exclusão de usuário.
 * Delega a autorização e lógica de soft-delete ao DeleteUserService.
 */
class DeleteUserController {
  /**
   * Processa requisições DELETE /v1/user/:id.
   * @param {import('express').Request} req - Objeto de requisição do Express.
   * @param {import('express').Response} res - Objeto de resposta do Express.
   * @returns {Promise<void>}
   */
  async handle(req, res) {
    const targetUserId = req.params.id;
    const loggedUser = req.user;
    const result = await DeleteUserService.execute({ targetUserId, loggedUser });
    return res.status(200).json(result);
  }
}

module.exports = new DeleteUserController();
