const CreateOrderService = require("../../core/services/create-order.service");

/**
 * @swagger
 * /v1/orders:
 *   post:
 *     summary: Cria um novo pedido (checkout)
 *     description: Finaliza o processo de checkout convertendo o carrinho do usuário em um pedido confirmado. Requer informações pessoais, endereço de entrega e dados de pagamento. O carrinho será limpo após a criação bem-sucedida do pedido.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - personal_info
 *               - delivery_address
 *               - payment
 *             properties:
 *               personal_info:
 *                 type: object
 *                 description: Informações pessoais do cliente
 *                 required:
 *                   - full_name
 *                   - cpf
 *                   - email
 *                   - phone
 *                 properties:
 *                   full_name:
 *                     type: string
 *                     description: Nome completo do cliente
 *                     minLength: 1
 *                     example: "João Silva Santos"
 *                   cpf:
 *                     type: string
 *                     description: CPF do cliente (com ou sem pontuação)
 *                     minLength: 11
 *                     maxLength: 14
 *                     example: "123.456.789-10"
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: E-mail de contato do cliente
 *                     example: "joao@email.com"
 *                   phone:
 *                     type: string
 *                     description: Telefone de contato (com ou sem formatação)
 *                     minLength: 10
 *                     example: "(11) 99999-9999"
 *               delivery_address:
 *                 type: object
 *                 description: Endereço de entrega do pedido
 *                 required:
 *                   - address
 *                   - neighborhood
 *                   - city
 *                   - cep
 *                 properties:
 *                   address:
 *                     type: string
 *                     description: Endereço completo (rua, número)
 *                     minLength: 1
 *                     example: "Rua das Flores, 123"
 *                   neighborhood:
 *                     type: string
 *                     description: Bairro
 *                     minLength: 1
 *                     example: "Centro"
 *                   city:
 *                     type: string
 *                     description: Cidade
 *                     minLength: 1
 *                     example: "São Paulo"
 *                   state:
 *                     type: string
 *                     description: Estado (opcional)
 *                     example: "SP"
 *                   cep:
 *                     type: string
 *                     description: CEP (com ou sem formatação)
 *                     minLength: 8
 *                     example: "01234-567"
 *                   complement:
 *                     type: string
 *                     description: Complemento (opcional)
 *                     maxLength: 255
 *                     example: "Apartamento 45, Bloco B"
 *               payment:
 *                 type: object
 *                 description: Informações de pagamento
 *                 required:
 *                   - method
 *                 properties:
 *                   method:
 *                     type: string
 *                     enum: ["credit-card", "boleto", "pix"]
 *                     description: Método de pagamento escolhido
 *                     example: "credit-card"
 *                   installments:
 *                     type: integer
 *                     description: Número de parcelas (para cartão de crédito)
 *                     minimum: 1
 *                     maximum: 24
 *                     example: 3
 *                   card_holder:
 *                     type: string
 *                     description: Nome no cartão de crédito
 *                     example: "JOAO SILVA SANTOS"
 *                   card_number:
 *                     type: string
 *                     description: Número do cartão de crédito (será mascarado)
 *                     example: "1234567890123456"
 *                   card_expiry:
 *                     type: string
 *                     description: Data de vencimento do cartão (MM/AA)
 *                     example: "12/25"
 *                   card_cvv:
 *                     type: string
 *                     description: Código de segurança do cartão
 *                     example: "123"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de confirmação
 *                   example: "Pedido criado com sucesso"
 *                 order_id:
 *                   type: string
 *                   format: uuid
 *                   description: ID único do pedido criado
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
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
 *                       message:
 *                         type: string
 *       401:
 *         description: Token de autenticação não fornecido ou inválido
 *       422:
 *         description: Carrinho vazio ou produtos indisponíveis
 */

/**
 * Controller responsável pelo processamento do checkout de pedidos.
 * Gerencia a conversão de um carrinho ativo em um pedido finalizado.
 */
class CreateOrderController {
  /**
   * Processa a requisição POST /v1/orders.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>}
   */
  async handle(req, res) {
    // Controller lida com input/output via HTTP
    const userId = req.user.sub;
    const { personal_info, delivery_address, payment } = req.body;

    const { order_id } = await CreateOrderService.execute({
      user_id: userId,
      personal_info,
      delivery_address,
      payment,
    });

    return res.status(201).json({
      message: "Pedido criado com sucesso",
      order_id,
    });
  }
}

module.exports = new CreateOrderController();
