const AppError = require("../../../../shared/errors/AppError");
const CategoryRepository = require("../../persistence/category.repository");

/**
 * Serviço responsável pela atualização de categorias.
 * Verifica existência antes de persistir as alterações.
 */
class UpdateCategoryService {
  /**
   * Atualiza uma categoria existente pelo ID.
   * @param {string} targetCategoryId - UUID da categoria a ser atualizada.
   * @param {Object} data - Dados de atualização.
   * @param {string} data.name - Novo nome da categoria.
   * @param {string} data.slug - Novo slug da categoria.
   * @param {boolean} data.use_in_menu - Novo valor de exibição no menu.
   * @returns {Promise<Object>} A categoria atualizada.
   * @throws {AppError} 404 - Se a categoria não for encontrada.
   */
  async execute(targetCategoryId, data) {
    const category = await CategoryRepository.findById(targetCategoryId);

    if (!category) {
      throw new AppError("Recurso não encontrado.", 404);
    }

    const updatedCategory = await CategoryRepository.update(targetCategoryId, data);

    return updatedCategory;
  }
}

module.exports = new UpdateCategoryService();