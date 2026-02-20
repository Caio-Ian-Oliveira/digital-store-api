const AppError = require("../../../../shared/errors/AppError");
const CategoryRepository = require("../../persistence/category.repository.js");

class CreateCategoryService {
  async execute(data) {
    // Verifica se já existe categoria com o mesmo nome ou slug
    const existing = await CategoryRepository.findByNameOrSlug(data.name, data.slug);
    if (existing) {
      throw new AppError("Categoria já existe (nome ou slug duplicado)", 400);
    }
    const category = await CategoryRepository.create(data);
    return category;
  }
}

module.exports = new CreateCategoryService();
