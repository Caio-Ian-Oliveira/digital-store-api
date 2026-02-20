const CategoryRepository = require("../../persistence/category.repository");

/**
 * Serviço responsável pela busca paginada de categorias.
 * Recebe parâmetros já validados pelo validator e delega a consulta ao repository.
 */
class SearchCategoryService {
  /**
   * Executa a busca de categorias com filtros e paginação.
   * @param {Object} params - Parâmetros de busca validados pelo middleware.
   * @param {number} params.limit - Limite de itens por página (-1 para todos).
   * @param {number} params.page - Número da página.
   * @param {string[]} [params.fields] - Campos a serem retornados.
   * @param {boolean} [params.use_in_menu] - Filtro de exibição no menu.
   * @returns {Promise<Object>} Objeto com data, total, limit e page.
   */
  async execute(params) {
    const { data, total } = await CategoryRepository.searchCategories(params);

    return {
      data,
      total,
      limit: params.limit,
      page: params.page,
    };
  }
}

module.exports = new SearchCategoryService();
