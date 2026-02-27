const CartRepository = require("../../persistence/cart.repository");

/**
 * Serviço responsável por limpar todos os itens do carrinho.
 * Útil após a conclusão de uma compra/checkout.
 */
class ClearCartService {
  /**
   * Remove todos os itens do carrinho do usuário autenticado.
   * @param {string} userId - UUID do usuário (extraído do token JWT).
   * @returns {Promise<boolean>} true após a limpeza.
   */
  async execute(userId) {
    const cart = await CartRepository.findOrCreateCart(userId);
    await CartRepository.clearCart(cart.id);
    return true;
  }
}

module.exports = new ClearCartService();
