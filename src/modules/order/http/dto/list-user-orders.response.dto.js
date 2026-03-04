class ListUserOrdersResponseDto {
  /**
   * Converte a lista de Models do Sequelize para o contrato do Frontend.
   * @param {Array} orders - Lista retornada pelo repositório.
   * @returns {Array} JSON formatado para a página "Meus Pedidos".
   */
  static fromDomain(orders) {
    return orders.map((order) => ({
      id: order.id,
      status: order.status,
      created_at: order.createdAt,
      total: parseFloat(order.total),
      items: order.items.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        image_url: item.image_url,
        quantity: item.quantity,
        price_at_purchase: parseFloat(item.price_at_purchase),
      })),
    }));
  }
}

module.exports = ListUserOrdersResponseDto;
