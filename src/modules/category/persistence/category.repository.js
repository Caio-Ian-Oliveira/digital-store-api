const { Category, Sequelize } = require("../../../models");

class CategoryRepository {
  async create(data) {
    const createdCategory = await Category.create(data);
    return createdCategory;
  }

  async findByNameOrSlug(name, slug) {
    return await Category.findOne({
      where: {
        [Sequelize.Op.or]: [{ name }, { slug }],
      },
    });
  }
}

module.exports = new CategoryRepository();
