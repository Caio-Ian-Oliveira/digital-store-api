const ListUserOrdersService = require("../../core/services/list-user-orders.service");
const ListUserOrdersResponseDto = require("../dto/list-user-orders.response.dto");

/**
 * @swagger
 * /v1/orders:
 *   get:
 *     summary: Lista os pedidos do usuário autenticado
 *     description: Retorna uma lista paginada de todos os pedidos realizados pelo usuário autenticado, ordenados do mais recente para o mais antigo. Inclui informações básicas de cada pedido como status, data, valor total e itens.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número máximo de pedidos por página
 *         example: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página para navegação
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de pedidos recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array de pedidos do usuário
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: ID único do pedido
 *                       status:
 *                         type: string
 *                         enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"]
 *                         description: Status atual do pedido
 *                       total_amount:
 *                         type: number
 *                         description: Valor total do pedido
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação do pedido
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: Data da última atualização
 *                       items_count:
 *                         type: integer
 *                         description: Número total de itens no pedido
 *                       personal_info:
 *                         type: object
 *                         description: Informações pessoais usadas no pedido
 *                         properties:
 *                           full_name:
 *                             type: string
 *                             description: Nome completo
 *                           email:
 *                             type: string
 *                             description: E-mail de contato
 *                 total:
 *                   type: integer
 *                   description: Número total de pedidos do usuário
 *                 limit:
 *                   type: integer
 *                   description: Limite de itens por página usado
 *                 page:
 *                   type: integer
 *                   description: Número da página atual
 *             example:
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   status: "delivered"
 *                   total_amount: 189.98
 *                   created_at: "2024-01-15T14:30:00Z"
 *                   updated_at: "2024-01-20T10:15:00Z"
 *                   items_count: 2
 *                   personal_info:
 *                     full_name: "João Silva Santos"
 *                     email: "joao@email.com"
 *                 - id: "456e7890-e89b-12d3-a456-426614174001"
 *                   status: "shipped"
 *                   total_amount: 89.99
 *                   created_at: "2024-02-01T09:20:00Z"
 *                   updated_at: "2024-02-02T15:45:00Z"
 *                   items_count: 1
 *                   personal_info:
 *                     full_name: "João Silva Santos"
 *                     email: "joao@email.com"
 *               total: 15
 *               limit: 10
 *               page: 1
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
 * Controller para listagem de pedidos do usuário autenticado.
 * Recebe a requisição (com token validado) e extrai os parâmetros de paginação.
 */
class ListUserOrdersController {
  /**
   * Manipula a requisição HTTP GET para buscar os pedidos.
   * @param {import('express').Request} req - Objeto de Request do Express
   * @param {import('express').Response} res - Objeto de Response do Express
   */
  async handle(req, res) {
    // req.user é populado pelo auth-verification.middleware
    const userId = req.user.sub;
    const { limit, page } = req.query;

    const result = await ListUserOrdersService.execute(userId, limit, page);

    const dto = {
      data: ListUserOrdersResponseDto.fromDomain(result.data),
      total: result.total,
      limit: result.limit,
      page: result.page,
    };

    return res.status(200).json(dto);
  }
}

module.exports = new ListUserOrdersController();
