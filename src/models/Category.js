const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  /**
   * Category Model - Product categorization and navigation structure
   *
   * @class Category
   * @description Manages the hierarchical categorization system for organizing
   * products in the e-commerce store. Supports menu navigation and product
   * filtering with soft delete functionality for data integrity.
   *
   * @example
   * // Create a main category
   * const category = await Category.create({
   *   name: 'Athletic Footwear',
   *   slug: 'athletic-footwear',
   *   use_in_menu: true
   * });
   *
   * Business Rules:
   * - Category name should be descriptive and user-friendly
   * - Slug must be URL-safe for clean navigation paths
   * - use_in_menu controls visibility in main navigation
   * - Soft delete preserves category references in existing products
   * - Multiple products can belong to same category (many-to-many)
   *
   * Relationships:
   * - belongsToMany Product: Categories can contain multiple products
   * - through ProductCategory: Junction table for product associations
   *
   * Key Features:
   * - Hierarchical organization for complex product taxonomy
   * - Menu integration for storefront navigation
   * - URL-friendly slug generation for SEO
   * - Soft delete support for data consistency
   * - Administrative control over menu visibility
   *
   * Usage Patterns:
   * - Main categories: "Footwear", "Clothing", "Accessories"
   * - Sub-categories: "Athletic Shoes", "Casual Shoes", "Boots"
   * - Special collections: "New Arrivals", "Sale Items", "Featured"
   * - Brand categories: "Nike", "Adidas", "Puma"
   *
   * @since 1.0.0
   */
  class Category extends Model {
    static associate(_models) {}
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      use_in_menu: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "category",
      tableName: "categories",
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return Category;
};
