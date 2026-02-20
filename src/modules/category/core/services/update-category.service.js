const AppError = require("../../../../shared/errors/AppError");
const CategoryRepository = require("../../persistence/category.repository");

class UpdateCategoryService {
    async execute(targetCategoryId, data) {
        const category = await CategoryRepository.findById(targetCategoryId);

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        const updatedCategory = await CategoryRepository.update(targetCategoryId, data);

        return updatedCategory;
    }   
}

module.exports = new UpdateCategoryService();