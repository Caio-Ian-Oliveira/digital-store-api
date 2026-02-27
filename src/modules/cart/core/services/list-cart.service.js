const CartRepository = require("../../persistence/cart.repository");

/**
 * Serviço responsável pela listagem do carrinho do usuário.
 * Retorna o carrinho com todos os itens e dados dos produtos populados.
 */
class ListCartService {
  /**
   * Lista os itens do carrinho do usuário autenticado.
   * @param {string} userId - UUID do usuário (extraído do token JWT).
   * @returns {Promise<Object>} Objeto contendo o array de itens do carrinho.
   */
  async execute(userId) {
    const cart = await CartRepository.getCartWithItems(userId);

    if (!cart) {
      return { items: [] };
    }

    return { items: cart.items };
  }
}

module.exports = new ListCartService();
