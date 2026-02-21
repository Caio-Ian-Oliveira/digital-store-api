const AppError = require("../../../../shared/errors/app-error");
const CategoryRepository = require("../../persistence/category.repository.js");

/**
 * Serviço responsável pela criação de categorias.
 * Verifica duplicidade de nome/slug antes de persistir.
 */
class CreateCategoryService {
  /**
   * Cria uma nova categoria após validar unicidade.
   * @param {Object} data - Dados da categoria a ser criada.
   * @param {string} data.name - Nome da categoria.
   * @param {string} data.slug - Slug da categoria.
   * @param {boolean} [data.use_in_menu] - Se a categoria deve aparecer no menu.
   * @returns {Promise<Object>} A categoria criada.
   * @throws {AppError} 400 - Se já existir categoria com mesmo nome ou slug.
   */
  async execute(data) {
    const existing = await CategoryRepository.findByNameOrSlug(data.name, data.slug);
    if (existing) {
      throw new AppError("Categoria já existe (nome ou slug duplicado)", 400);
    }
    const category = await CategoryRepository.create(data);
    return category;
  }
}

module.exports = new CreateCategoryService();
