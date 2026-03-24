const UpdateOrderStatusService = require("../../core/services/update-order-status.service");
const ListUserOrdersResponseDto = require("../dto/list-user-orders.response.dto");

/**
 * @swagger
 * /v1/admin/orders/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um pedido (Admin)
 *     description: Endpoint administrativo para alterar o status de um pedido específico. Permite transições entre diferentes estados do pedido como pendente, confirmado, enviado, entregue ou cancelado. Requer privilégios de administrador.
 *     tags:
 *       - Admin - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do pedido a ser atualizado
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
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"]
 *                 description: Novo status para o pedido
 *                 example: "shipped"
 *           example:
 *             status: "shipped"
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de confirmação
 *                   example: "Status do pedido atualizado com sucesso."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID do pedido atualizado
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     status:
 *                       type: string
 *                       description: Novo status aplicado
 *                       example: "shipped"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Data e hora da atualização
 *                       example: "2024-02-15T14:30:00Z"
 *             example:
 *               message: "Status do pedido atualizado com sucesso."
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 status: "shipped"
 *                 updated_at: "2024-02-15T14:30:00Z"
 *       400:
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Status inválido"
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
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pedido não encontrado"
 *       422:
 *         description: Transição de status inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Não é possível alterar status de 'delivered' para 'pending'"
 */

/**
 * Controller para atualização de status de pedidos (Restrito ao ADMIN).
 */
class UpdateOrderStatusController {
  /**
   * Manipula a requisição HTTP PATCH para alterar o status de um pedido.
   * @param {import('express').Request} req - Objeto de Request do Express
   * @param {import('express').Response} res - Objeto de Response do Express
   */
  async handle(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await UpdateOrderStatusService.execute(id, status);

    const dto = {
      message: "Status do pedido atualizado com sucesso.",
      data: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        updated_at: updatedOrder.updatedAt,
      },
    };

    return res.status(200).json(dto);
  }
}

module.exports = new UpdateOrderStatusController();
