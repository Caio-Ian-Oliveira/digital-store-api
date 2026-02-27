const AppError = require("../../../../shared/errors/app-error");
const CartRepository = require("../../persistence/cart.repository");

/**
 * Serviço responsável por remover um item do carrinho.
 * Valida ownership: o item deve pertencer ao carrinho do usuário autenticado.
 */
class RemoveCartItemService {
  /**
   * Remove um item do carrinho do usuário.
   * @param {string} userId - UUID do usuário (extraído do token JWT).
   * @param {string} itemId - UUID do CartItem a ser removido.
   * @returns {Promise<boolean>} true se o item foi removido com sucesso.
   * @throws {AppError} 404 - Se o item não for encontrado.
   * @throws {AppError} 403 - Se o item não pertencer ao usuário.
   */
  async execute(userId, itemId) {
    const item = await CartRepository.findItemById(itemId);

    if (!item) {
      throw new AppError("Item do carrinho não encontrado.", 404);
    }

    // Valida ownership
    if (item.cart.user_id !== userId) {
      throw new AppError("Acesso negado.", 403);
    }

    await CartRepository.removeItem(itemId);
    return true;
  }
}

module.exports = new RemoveCartItemService();
