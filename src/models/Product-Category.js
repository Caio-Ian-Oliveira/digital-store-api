const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * ProductCategory Model - Junction table for Product-Category many-to-many relationships
   *
   * @class ProductCategory
   * @description Through table that enables many-to-many relationships between
   * Products and Categories. Allows products to belong to multiple categories
   * simultaneously and categories to contain multiple products.
   *
   * @example
   * // Product belongs to multiple categories
   * // This model is typically managed automatically via Sequelize associations
   *
   * // Via Product model:
   * const product = await Product.findByPk(123);
   * await product.setCategories([categoryId1, categoryId2, categoryId3]);
   *
   * // Via Category model:
   * const category = await Category.findByPk(categoryId);
   * const products = await category.getProducts();
   *
   * Business Rules:
   * - Composite primary key (product_id + category_id)
   * - Prevents duplicate category assignments for same product
   * - Cascade deletes maintain referential integrity
   * - No additional data stored beyond the relationship
   *
   * Relationship Patterns:
   * - Athletic Footwear → [Nike Air Max, Adidas Ultraboost, etc.]
   * - New Arrivals → [Recently added products across all categories]
   * - Sale Items → [Discounted products from various categories]
   * - Featured Products → [Highlighted items for marketing]
   *
   * Database Design:
   * - product_id: References products.id (INTEGER)
   * - category_id: References categories.id (UUID)
   * - Composite primary key ensures unique product-category pairs
   * - CASCADE operations maintain data consistency
   *
   * Key Features:
   * - Enables flexible product taxonomy
   * - Supports cross-category product placement
   * - Automatic relationship management via Sequelize
   * - Ensures referential integrity
   * - Optimized for category-based product browsing
   *
   * Query Patterns:
   * - Products by category: JOIN for category-filtered product lists
   * - Category memberships: JOIN for product's category associations
   * - Cross-category analysis: Aggregate queries for reporting
   * - Navigation menus: Category trees with product counts
   *
   * Performance Considerations:
   * - Indexed foreign keys for fast lookup operations
   * - Composite index on (product_id, category_id) for uniqueness
   * - Minimal data storage (only relationship pointers)
   * - Efficient bulk operations for category assignments
   *
   * @since 1.0.0
   */
  class ProductCategory extends Model {}

  ProductCategory.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Productcategory",
      tableName: "product_categories",
      timestamps: false,
    },
  );

  return ProductCategory;
};
