const AppError = require("../../../../shared/errors/app-error");
const CategoryRepository = require("../../persistence/category.repository");

/**
 * Serviço responsável por buscar uma categoria pelo ID.
 */
class GetCategoryByIdService {
  /**
   * Busca uma categoria específica pelo seu identificador.
   * @param {string} targetCategoryId - UUID da categoria.
   * @returns {Promise<Object>} A categoria encontrada.
   * @throws {AppError} 404 - Se a categoria não for encontrada.
   */
  async execute(targetCategoryId) {
    const response = await CategoryRepository.findById(targetCategoryId);
    if (!response) {
      throw new AppError("Recurso não encontrado.", 404);
    }
    return response;
  }
}

module.exports = new GetCategoryByIdService();
