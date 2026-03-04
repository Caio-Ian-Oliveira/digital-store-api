const OrderRepository = require("../../persistence/order.repository");

/**
 * Serviço responsável por listar todos os pedidos de um usuário.
 */
class ListUserOrdersService {
  /**
   * Retorna todos os pedidos do usuário autenticado.
   * @param {string} userId - UUID do usuário logado.
   * @returns {Promise<Array>} Lista de pedidos (pode ser vazia).
   */

  async execute(userId) {
    const orders = await OrderRepository.findAllByUser(userId);
    return orders;
  }
}

module.exports = new ListUserOrdersService();
