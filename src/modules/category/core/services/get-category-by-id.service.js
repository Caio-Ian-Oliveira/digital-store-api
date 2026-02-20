const AppError = require("../../../../shared/errors/AppError");
const categoryRepository = require("../../persistence/category.repository");

class GetCategoryByIdService {
  async execute(targetCategoryId) {
    const response = await categoryRepository.findById(targetCategoryId);
    if (!response) {
      throw new AppError("Category not found.", 404);
    }
    return response;
  }
}

module.exports = new GetCategoryByIdService();
