const AppError = require("../../../../shared/errors/app-error");
const CartRepository = require("../../persistence/cart.repository");

/**
 * Serviço responsável por atualizar a quantidade de um item no carrinho.
 * Valida ownership: o item deve pertencer ao carrinho do usuário autenticado.
 */
class UpdateCartItemService {
  /**
   * Atualiza a quantidade de um item no carrinho.
   * @param {string} userId - UUID do usuário (extraído do token JWT).
   * @param {string} itemId - UUID do CartItem a ser atualizado.
   * @param {number} quantity - Nova quantidade desejada.
   * @returns {Promise<import('sequelize').Model>} CartItem atualizado.
   * @throws {AppError} 404 - Se o item não for encontrado.
   * @throws {AppError} 403 - Se o item não pertencer ao usuário.
   */
  async execute(userId, itemId, quantity) {
    const item = await CartRepository.findItemById(itemId);

    if (!item) {
      throw new AppError("Item do carrinho não encontrado.", 404);
    }

    // Valida ownership
    if (item.cart.user_id !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    return CartRepository.updateItemQuantity(itemId, quantity);
  }
}

module.exports = new UpdateCartItemService();
