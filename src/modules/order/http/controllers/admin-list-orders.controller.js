const ListAllOrdersService = require("../../core/services/admin-list-orders.service");
const ListUserOrdersResponseDto = require("../dto/list-user-orders.response.dto");

/**
 * @swagger
 * /v1/admin/orders:
 *   get:
 *     summary: Lista todos os pedidos do sistema (Admin)
 *     description: Endpoint administrativo para listar todos os pedidos do sistema com opção de filtrar por usuário específico. Inclui informações detalhadas dos pedidos, cliente e status. Requer privilégios de administrador.
 *     tags:
 *       - Admin - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID de usuário específico para filtrar os pedidos (opcional)
 *         example: "user123"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Número máximo de pedidos por página
 *         example: 20
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
 *                   description: Array de pedidos do sistema
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: ID único do pedido
 *                       user_id:
 *                         type: string
 *                         description: ID do usuário que fez o pedido
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
 *                         description: Informações pessoais do cliente
 *                         properties:
 *                           full_name:
 *                             type: string
 *                             description: Nome completo do cliente
 *                           email:
 *                             type: string
 *                             description: E-mail do cliente
 *                           phone:
 *                             type: string
 *                             description: Telefone do cliente
 *                       delivery_address:
 *                         type: object
 *                         description: Endereço de entrega
 *                         properties:
 *                           address:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                 total:
 *                   type: integer
 *                   description: Número total de pedidos encontrados
 *                 limit:
 *                   type: integer
 *                   description: Limite de itens por página usado
 *                 page:
 *                   type: integer
 *                   description: Número da página atual
 *             example:
 *               data:
 *                 - id: "123e4567-e89b-12d3-a456-426614174000"
 *                   user_id: "user123"
 *                   status: "shipped"
 *                   total_amount: 189.98
 *                   created_at: "2024-01-15T14:30:00Z"
 *                   updated_at: "2024-01-20T10:15:00Z"
 *                   items_count: 2
 *                   personal_info:
 *                     full_name: "João Silva Santos"
 *                     email: "joao@email.com"
 *                     phone: "(11) 99999-9999"
 *                   delivery_address:
 *                     address: "Rua das Flores, 123"
 *                     city: "São Paulo"
 *                     state: "SP"
 *               total: 847
 *               limit: 20
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
 *       403:
 *         description: Usuário não tem privilégios de administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acesso negado. Privilégios de administrador necessários."
 */

/**
 * Controller para listagem de pedidos (Restrito ao ADMIN).
 * Pode listar todos os pedidos do sistema ou filtrar por um usuário específico via query string.
 */
class AdminListOrdersController {
  /**
   * Manipula a requisição HTTP GET para buscar os pedidos.
   * @param {import('express').Request} req - Objeto de Request do Express
   * @param {import('express').Response} res - Objeto de Response do Express
   */
  async handle(req, res) {
    const { userId, limit, page } = req.query;

    const result = await ListAllOrdersService.execute({ userId, limit, page });

    const dto = {
      data: ListUserOrdersResponseDto.fromDomain(result.data),
      total: result.total,
      limit: result.limit,
      page: result.page,
    };

    return res.status(200).json(dto);
  }
}

module.exports = new AdminListOrdersController();
