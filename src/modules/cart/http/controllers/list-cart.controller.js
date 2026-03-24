const ListCartService = require("../../core/services/list-cart.service");
const ListCartResponseDto = require("../dto/response/list-cart.response.dto");

/**
 * @swagger
 * /v1/cart:
 *   get:
 *     summary: Lista os itens do carrinho do usuário
 *     description: Retorna todos os itens atualmente no carrinho do usuário autenticado, incluindo informações detalhadas dos produtos como preços, imagens e opções selecionadas.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho recuperado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID único do item no carrinho
 *                           quantity:
 *                             type: integer
 *                             description: Quantidade do produto no carrinho
 *                             minimum: 1
 *                           selected_color:
 *                             type: string
 *                             nullable: true
 *                             description: Cor selecionada do produto (se aplicável)
 *                           selected_size:
 *                             type: string
 *                             nullable: true
 *                             description: Tamanho selecionado do produto (se aplicável)
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 description: ID do produto
 *                               name:
 *                                 type: string
 *                                 description: Nome do produto
 *                               slug:
 *                                 type: string
 *                                 description: Slug do produto para URLs
 *                               price:
 *                                 type: number
 *                                 description: Preço regular do produto
 *                               price_with_discount:
 *                                 type: number
 *                                 description: Preço com desconto aplicado
 *                               stock:
 *                                 type: integer
 *                                 description: Quantidade disponível em estoque
 *                               enabled:
 *                                 type: boolean
 *                                 description: Se o produto está ativo para venda
 *                               images:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                       description: ID da imagem
 *                                     path:
 *                                       type: string
 *                                       description: URL da imagem do produto
 *                                     enabled:
 *                                       type: boolean
 *                                       description: Se a imagem está ativa
 *             example:
 *               cart:
 *                 items:
 *                   - id: "123e4567-e89b-12d3-a456-426614174000"
 *                     quantity: 2
 *                     selected_color: "Azul"
 *                     selected_size: "M"
 *                     product:
 *                       id: 1
 *                       name: "Camiseta Premium"
 *                       slug: "camiseta-premium"
 *                       price: 89.99
 *                       price_with_discount: 79.99
 *                       stock: 15
 *                       enabled: true
 *                       images:
 *                         - id: 1
 *                           path: "https://example.com/image.jpg"
 *                           enabled: true
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
 * Controller responsável pela listagem do carrinho.
 * Extrai o userId do token JWT e delega ao serviço.
 */
class ListCartController {
  /**
   * Processa a requisição GET /v1/cart.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com os itens do carrinho (200).
   */
  async handle(req, res) {
    const userId = req.user.sub;
    const result = await ListCartService.execute(userId);
    return res.status(200).json(ListCartResponseDto.toResponse(result));
  }
}

module.exports = new ListCartController();
