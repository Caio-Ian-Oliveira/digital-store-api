const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * Product Model - Core inventory management for e-commerce products
   *
   * @class Product
   * @description Manages the complete product catalog including pricing, inventory,
   * categorization, and complex product variations (colors, sizes, etc.).
   * Supports flexible pricing with discount structures and stock management.
   *
   * @example
   * // Create a product with full details
   * const product = await Product.create({
   *   name: 'Premium Sneakers',
   *   slug: 'premium-sneakers',
   *   price: 199.99,
   *   price_with_discount: 149.99,
   *   stock: 50,
   *   enabled: true,
   *   description: 'High-quality athletic footwear...',
   *   brand: 'Nike',
   *   gender: 'Unisex'
   * });
   *
   * Business Rules:
   * - Product must have both regular price and discounted price
   * - Stock levels are managed at product level (not variant level)
   * - Slug should be URL-friendly and unique for SEO
   * - Enabled flag controls product visibility in store
   * - Display order allows custom product sorting in listings
   *
   * Relationships:
   * - hasMany ProductImage: Multiple product photos with display ordering
   * - hasMany ProductOption: Customizable attributes (colors, sizes, materials)
   * - belongsToMany Category: Products can belong to multiple categories
   * - hasMany CartItem: Tracks cart additions for inventory management
   *
   * Key Features:
   * - Flexible pricing with discount support
   * - Multi-category classification system
   * - Customizable product options (colors, sizes, etc.)
   * - Stock management and availability tracking
   * - Gender-based product categorization
   * - Brand organization and filtering
   * - Custom display ordering for merchandising
   *
   * Search & Filtering:
   * - Full-text search on name and description
   * - Price range filtering
   * - Brand and gender filters
   * - Category-based browsing
   * - Option-based filtering (e.g., color, size)
   *
   * @since 1.0.0
   */
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductImage, {
        foreignKey: "product_id",
        as: "images",
        onDelete: "CASCADE",
      });
      Product.hasMany(models.ProductOption, {
        foreignKey: "product_id",
        as: "options",
        onDelete: "CASCADE",
      });
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        foreignKey: "product_id",
        otherKey: "category_id",
        as: "categories",
      });
      Product.hasMany(models.CartItem, {
        foreignKey: "product_id",
        as: "cartItems",
        onDelete: "CASCADE",
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      use_in_menu: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Masculino", "Feminino", "Unisex"),
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "product",
      tableName: "products",
      underscored: true,
      timestamps: true,
    },
  );

  return Product;
};
