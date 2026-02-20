const DeleteProductService = require("../../core/services/delete-product.service");

/**
 * @swagger
 * /v1/product/{id}:
 *   delete:
 *     summary: Remove um produto (hard delete)
 *     description: |
 *       - Remove permanentemente um produto e seus dados relacionados (imagens, opções via CASCADE).
 *       - É necessário autenticação via Bearer Token JWT.
 *       - Apenas usuários com role ADMIN podem deletar produtos.
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (usuário não é ADMIN)
 *       404:
 *         description: Produto não encontrado
 */

/**
 * Controller responsável pela exclusão de produtos.
 * Recebe a requisição HTTP e delega ao serviço de deleção.
 */
class DeleteProductController {
  /**
   * Processa a requisição de exclusão de produto.
   * @param {import('express').Request} req - Objeto de requisição Express (params.id).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta vazia (204 No Content).
   */
  async handle(req, res) {
    const targetProductId = req.params.id;

    await DeleteProductService.execute(targetProductId);

    return res.status(204).send();
  }
}

module.exports = new DeleteProductController();
