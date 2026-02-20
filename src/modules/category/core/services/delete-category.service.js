const AppError = require("../../../../shared/errors/AppError");
const CategoryRepository = require("../../persistence/category.repository");

/**
 * Serviço responsável pela exclusão lógica (soft delete) de categorias.
 * Verifica existência antes de realizar o soft delete.
 */
class DeleteCategoryService {
  /**
   * Executa o soft delete de uma categoria pelo ID.
   * @param {string} targetCategoryId - UUID da categoria a ser deletada.
   * @returns {Promise<Object>} A categoria que foi deletada.
   * @throws {AppError} 404 - Se a categoria não for encontrada.
   */
  async execute(targetCategoryId) {
    const categoryExists = await CategoryRepository.findById(targetCategoryId);
    if (!categoryExists) {
      throw new AppError("Recurso não encontrado.", 404);
    }
    await CategoryRepository.softDelete(targetCategoryId);
    return categoryExists;
  }
}

module.exports = new DeleteCategoryService();
