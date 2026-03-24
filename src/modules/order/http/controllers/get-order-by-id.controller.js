const GetOrderByIdService = require("../../core/services/get-order-by-id.service");
const GetOrderByIdResponseDto = require("../dto/get-order-by-id.response.dto");

/**
 * @swagger
 * /v1/orders/{id}:
 *   get:
 *     summary: Visualiza detalhes de um pedido específico
 *     description: Retorna informações completas de um pedido específico incluindo itens, informações pessoais, endereço de entrega, dados de pagamento e histórico de status. O usuário só pode acessar seus próprios pedidos. Funciona como uma nota fiscal imutável.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do pedido a ser consultado
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Detalhes do pedido recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: ID único do pedido
 *                 status:
 *                   type: string
 *                   enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"]
 *                   description: Status atual do pedido
 *                 total_amount:
 *                   type: number
 *                   description: Valor total do pedido
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data de criação do pedido
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data da última atualização
 *                 personal_info:
 *                   type: object
 *                   description: Informações pessoais do cliente no momento da compra
 *                   properties:
 *                     full_name:
 *                       type: string
 *                       description: Nome completo
 *                     cpf:
 *                       type: string
 *                       description: CPF do cliente
 *                     email:
 *                       type: string
 *                       description: E-mail de contato
 *                     phone:
 *                       type: string
 *                       description: Telefone de contato
 *                 delivery_address:
 *                   type: object
 *                   description: Endereço de entrega
 *                   properties:
 *                     address:
 *                       type: string
 *                       description: Endereço completo
 *                     neighborhood:
 *                       type: string
 *                       description: Bairro
 *                     city:
 *                       type: string
 *                       description: Cidade
 *                     state:
 *                       type: string
 *                       description: Estado
 *                     cep:
 *                       type: string
 *                       description: CEP
 *                     complement:
 *                       type: string
 *                       description: Complemento
 *                 payment_info:
 *                   type: object
 *                   description: Informações de pagamento (dados sensíveis mascarados)
 *                   properties:
 *                     method:
 *                       type: string
 *                       enum: ["credit-card", "boleto", "pix"]
 *                       description: Método de pagamento
 *                     installments:
 *                       type: integer
 *                       description: Número de parcelas
 *                     card_holder:
 *                       type: string
 *                       description: Nome no cartão (se aplicável)
 *                     masked_card_number:
 *                       type: string
 *                       description: Número do cartão mascarado
 *                 items:
 *                   type: array
 *                   description: Itens do pedido com informações detalhadas
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: ID do item no pedido
 *                       product_id:
 *                         type: integer
 *                         description: ID do produto
 *                       product_name:
 *                         type: string
 *                         description: Nome do produto no momento da compra
 *                       quantity:
 *                         type: integer
 *                         description: Quantidade comprada
 *                       unit_price:
 *                         type: number
 *                         description: Preço unitário no momento da compra
 *                       total_price:
 *                         type: number
 *                         description: Preço total (quantidade × preço unitário)
 *                       selected_color:
 *                         type: string
 *                         nullable: true
 *                         description: Cor selecionada
 *                       selected_size:
 *                         type: string
 *                         nullable: true
 *                         description: Tamanho selecionado
 *             example:
 *               id: "123e4567-e89b-12d3-a456-426614174000"
 *               status: "delivered"
 *               total_amount: 189.98
 *               created_at: "2024-01-15T14:30:00Z"
 *               updated_at: "2024-01-20T10:15:00Z"
 *               personal_info:
 *                 full_name: "João Silva Santos"
 *                 cpf: "123.456.789-10"
 *                 email: "joao@email.com"
 *                 phone: "(11) 99999-9999"
 *               delivery_address:
 *                 address: "Rua das Flores, 123"
 *                 neighborhood: "Centro"
 *                 city: "São Paulo"
 *                 state: "SP"
 *                 cep: "01234-567"
 *                 complement: "Apartamento 45"
 *               payment_info:
 *                 method: "credit-card"
 *                 installments: 3
 *                 card_holder: "JOAO SILVA SANTOS"
 *                 masked_card_number: "**** **** **** 1234"
 *               items:
 *                 - id: "item-uuid-1"
 *                   product_id: 1
 *                   product_name: "Camiseta Premium"
 *                   quantity: 2
 *                   unit_price: 89.99
 *                   total_price: 179.98
 *                   selected_color: "Azul"
 *                   selected_size: "M"
 *                 - id: "item-uuid-2"
 *                   product_id: 2
 *                   product_name: "Boné Esportivo"
 *                   quantity: 1
 *                   unit_price: 10.00
 *                   total_price: 10.00
 *                   selected_color: null
 *                   selected_size: "Único"
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
 *         description: Pedido não encontrado ou não pertence ao usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pedido não encontrado"
 */

class GetOrderByIdController {
  async handle(req, res) {
    const orderId = req.params.id;
    const userId = req.user.sub;

    const order = await GetOrderByIdService.execute(orderId, userId);

    const dto = GetOrderByIdResponseDto.fromDomain(order);

    return res.status(200).json(dto);
  }
}

module.exports = new GetOrderByIdController();
