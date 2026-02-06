const CreateCategoryService = require("../../core/services/create-category.service");

class CreateCategoryController {
  async handle(req, res) {
    try {
      const category = await CreateCategoryService.execute(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CreateCategoryController();
