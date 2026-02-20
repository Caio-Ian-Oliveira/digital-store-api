const AppError = require("../../../../shared/errors/AppError")
const CategoryRepository = require("../../persistence/category.repository");

    class DeleteCategoryService {
    async execute(targetCategoryId) {
        const categoryExists = await CategoryRepository.findById(targetCategoryId);
        if (!categoryExists) {
            throw new AppError("Category not found.", 404);
        }
        await CategoryRepository.softDelete(targetCategoryId);
        return categoryExists;
    }
}

module.exports = new DeleteCategoryService();