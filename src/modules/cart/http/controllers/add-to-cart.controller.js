const AddToCartService = require("../../core/services/add-to-cart.service");

/**
 * @swagger
 * /v1/cart/add:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     description: Adiciona um produto ao carrinho do usuário autenticado. Se o produto já existir no carrinho com as mesmas opções, a quantidade será incrementada. Caso contrário, um novo item é criado.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID do produto a ser adicionado
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto a adicionar
 *                 minimum: 1
 *                 default: 1
 *                 example: 2
 *               selected_color:
 *                 type: string
 *                 description: Cor selecionada do produto (opcional)
 *                 example: "Azul"
 *               selected_size:
 *                 type: string
 *                 description: Tamanho selecionado do produto (opcional)
 *                 example: "M"
 *           example:
 *             product_id: 1
 *             quantity: 2
 *             selected_color: "Azul"
 *             selected_size: "M"
 *     responses:
 *       201:
 *         description: Produto adicionado ao carrinho com sucesso
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
 *                   description: Quantidade total no carrinho
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
 *               quantity: 2
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
 *                 - field: "product_id"
 *                   message: "product_id deve ser um inteiro positivo"
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
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Produto não encontrado"
 */

/**
 * Controller responsável por adicionar produtos ao carrinho.
 * Extrai o userId do token JWT e delega ao serviço.
 */
class AddToCartController {
  /**
   * Processa a requisição POST /v1/cart/add.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com o item adicionado/atualizado (201).
   */
  async handle(req, res) {
    const userId = req.user.sub;
    const item = await AddToCartService.execute(userId, req.body);
    return res.status(201).json(item);
  }
}

module.exports = new AddToCartController();
