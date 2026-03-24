const RemoveCartItemService = require("../../core/services/remove-cart-item.service");

/**
 * @swagger
 * /v1/cart/remove/{itemId}:
 *   delete:
 *     summary: Remove um item do carrinho
 *     description: Remove completamente um item específico do carrinho do usuário autenticado. O item deve pertencer ao usuário para ser removido.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: ID único do item no carrinho a ser removido
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       204:
 *         description: Item removido do carrinho com sucesso (sem conteúdo de resposta)
 *       400:
 *         description: Erro de validação no parâmetro enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: Campo que falhou na validação
 *                       message:
 *                         type: string
 *                         description: Mensagem de erro detalhada
 *             example:
 *               errors:
 *                 - field: "itemId"
 *                   message: "itemId deve ser um UUID válido"
 *       401:
 *         description: Token de autenticação não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token não fornecido"
 *       404:
 *         description: Item do carrinho não encontrado ou não pertence ao usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item não encontrado"
 */

/**
 * Controller responsável por remover um item do carrinho.
 * Extrai o userId do token JWT e delega ao serviço.
 */
class RemoveCartItemController {
  /**
   * Processa a requisição DELETE /v1/cart/remove/:itemId.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta 204 No Content.
   */
  async handle(req, res) {
    const userId = req.user.sub;
    const { itemId } = req.params;
    await RemoveCartItemService.execute(userId, itemId);
    return res.status(204).send();
  }
}

module.exports = new RemoveCartItemController();
