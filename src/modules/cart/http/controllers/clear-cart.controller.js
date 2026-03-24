const ClearCartService = require("../../core/services/clear-cart.service");

/**
 * @swagger
 * /v1/cart/clear:
 *   delete:
 *     summary: Limpa todos os itens do carrinho
 *     description: Remove todos os itens do carrinho do usuário autenticado, deixando o carrinho completamente vazio. Esta ação não pode ser desfeita.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Carrinho limpo com sucesso (sem conteúdo de resposta)
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
 */

/**
 * Controller responsável por limpar todos os itens do carrinho.
 * Extrai o userId do token JWT e delega ao serviço.
 */
class ClearCartController {
  /**
   * Processa a requisição DELETE /v1/cart/clear.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta 204 No Content.
   */
  async handle(req, res) {
    const userId = req.user.sub;
    await ClearCartService.execute(userId);
    return res.status(204).send();
  }
}

module.exports = new ClearCartController();
