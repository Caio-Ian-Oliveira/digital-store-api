const ProductRepository = require("../../persistence/product.repository");

/**
 * Serviço responsável pela busca paginada de produtos.
 * Delega a consulta com filtros ao repository.
 */
class SearchProductService {
  /**
   * Executa a busca de produtos com filtros e paginação.
   * @param {Object} params - Parâmetros de busca validados pelo middleware.
   * @param {number} [params.limit=12] - Limite de itens por página (-1 para todos).
   * @param {number} [params.page=1] - Número da página.
   * @param {string} [params.fields] - Campos a serem retornados (separados por vírgula).
   * @param {string} [params.match] - Termo de busca para nome ou descrição.
   * @param {string} [params.category_ids] - IDs das categorias (separados por vírgula).
   * @param {string} [params.priceRange] - Faixa de preço no formato "min-max".
   * @param {Object} [params.option] - Filtros de opções do produto.
   * @returns {Promise<{data: Object[], total: number, limit: number, page: number}>} Resultado paginado.
   */
  async execute(params) {
    return await ProductRepository.searchProducts(params);
  }
}

module.exports = new SearchProductService();
