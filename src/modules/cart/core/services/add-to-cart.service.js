const AppError = require("../../../../shared/errors/app-error");
const CartRepository = require("../../persistence/cart.repository");
const { initModels } = require("../../../../models");
const { Product } = initModels();

/**
 * Serviço responsável por adicionar produtos ao carrinho.
 * Implementa a regra de soma de quantidade quando o produto
 * (com mesma cor e tamanho) já existe no carrinho.
 */
class AddToCartService {
  /**
   * Adiciona um produto ao carrinho do usuário.
   * Se o item (mesma combinação produto/cor/tamanho) já existir, soma a quantidade.
   * @param {string} userId - UUID do usuário (extraído do token JWT).
   * @param {Object} data - Dados do item a ser adicionado.
   * @param {number} data.product_id - ID do produto.
   * @param {number} [data.quantity=1] - Quantidade a adicionar.
   * @param {string|null} [data.selected_color] - Cor selecionada.
   * @param {string|null} [data.selected_size] - Tamanho selecionado.
   * @returns {Promise<import('sequelize').Model>} CartItem criado ou atualizado.
   * @throws {AppError} 404 - Se o produto não existir ou não estiver habilitado.
   */
  async execute(userId, data) {
    // Valida se o produto existe e está habilitado
    const product = await Product.findByPk(data.product_id);
    if (!product) {
      throw new AppError("Produto não encontrado.", 404);
    }
    if (!product.enabled) {
      throw new AppError("Produto não está disponível.", 400);
    }

    // Busca ou cria o carrinho do usuário
    const cart = await CartRepository.findOrCreateCart(userId);

    // Verifica se já existe um item com mesma combinação
    const existingItem = await CartRepository.findCartItem(
      cart.id,
      data.product_id,
      data.selected_color || null,
      data.selected_size || null,
    );

    if (existingItem) {
      // Soma a quantidade ao item existente
      const newQuantity = existingItem.quantity + (data.quantity || 1);
      return CartRepository.updateItemQuantity(existingItem.id, newQuantity);
    }

    // Cria novo item no carrinho
    return CartRepository.addItem({
      cart_id: cart.id,
      product_id: data.product_id,
      quantity: data.quantity || 1,
      selected_color: data.selected_color || null,
      selected_size: data.selected_size || null,
    });
  }
}

module.exports = new AddToCartService();
