const UpdateCartItemService = require("../../core/services/update-cart-item.service");

/**
 * @swagger
 * /v1/cart/update/{itemId}:
 *   put:
 *     summary: Atualiza a quantidade de um item no carrinho
 *     description: Atualiza a quantidade de um item específico no carrinho do usuário autenticado. O item deve pertencer ao usuário para ser modificado.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: ID único do item no carrinho a ser atualizado
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Nova quantidade para o item
 *                 minimum: 1
 *                 maximum: 999
 *                 example: 3
 *           example:
 *             quantity: 3
 *     responses:
 *       200:
 *         description: Quantidade do item atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: ID único do item no carrinho
 *                 product_id:
 *                   type: integer
 *                   description: ID do produto
 *                 user_id:
 *                   type: string
 *                   description: ID do usuário
 *                 quantity:
 *                   type: integer
 *                   description: Nova quantidade do item
 *                 selected_color:
 *                   type: string
 *                   nullable: true
 *                   description: Cor selecionada
 *                 selected_size:
 *                   type: string
 *                   nullable: true
 *                   description: Tamanho selecionado
 *             example:
 *               id: "123e4567-e89b-12d3-a456-426614174000"
 *               product_id: 1
 *               user_id: "user123"
 *               quantity: 3
 *               selected_color: "Azul"
 *               selected_size: "M"
 *       400:
 *         description: Erro de validação nos dados enviados
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
 *                 - field: "quantity"
 *                   message: "quantity deve ser no mínimo 1"
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
 * Controller responsável por atualizar a quantidade de um item no carrinho.
 * Extrai o userId do token JWT e delega ao serviço.
 */
class UpdateCartItemController {
  /**
   * Processa a requisição PUT /v1/cart/update/:itemId.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com o item atualizado (200).
   */
  async handle(req, res) {
    const userId = req.user.sub;
    const { itemId } = req.params;
    const { quantity } = req.body;
    const item = await UpdateCartItemService.execute(userId, itemId, quantity);
    return res.status(200).json(item);
  }
}

module.exports = new UpdateCartItemController();
