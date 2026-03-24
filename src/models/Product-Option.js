const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * ProductOption Model - Configurable product variations and customizations
   *
   * @class ProductOption
   * @description Defines customizable attributes for products such as colors, sizes,
   * materials, or styles. Supports both visual (color swatches) and textual
   * (size labels) option presentation with flexible UI rendering controls.
   *
   * @example
   * // Create color and size options for a product
   * const colorOption = await ProductOption.create({
   *   product_id: 123,
   *   title: 'Color',
   *   type: 'color',
   *   shape: 'circle',
   *   radius: 4,
   *   values: JSON.stringify(['#FF0000', '#00FF00', '#0000FF']) // Red, Green, Blue
   * });
   *
   * const sizeOption = await ProductOption.create({
   *   product_id: 123,
   *   title: 'Size',
   *   type: 'text',
   *   shape: 'square',
   *   values: JSON.stringify(['XS', 'S', 'M', 'L', 'XL'])
   * });
   *
   * Business Rules:
   * - Each option defines one customization axis (color, size, material, etc.)
   * - Values stored as JSON string for flexible data types
   * - Shape and radius control UI presentation for visual options
   * - Type determines how values are displayed (color swatches vs text)
   * - Category association allows option templates and reuse
   *
   * Option Types:
   * - 'color': Visual color swatches (values as hex codes or color names)
   * - 'text': Text-based options (sizes, materials, styles)
   *
   * UI Presentation:
   * - shape: 'square' | 'circle' - Visual presentation of option buttons
   * - radius: Border radius for rounded corners (0 = sharp, higher = rounder)
   * - type: Controls whether to show color swatches or text labels
   *
   * Relationships:
   * - belongsTo Product: Option belongs to specific product
   * - belongsTo Category: Optional template category for option reuse
   *
   * Key Features:
   * - Flexible option value storage (JSON array)
   * - Visual customization for frontend presentation
   * - Support for complex product variations
   * - Template system via category association
   * - Dynamic option validation during cart operations
   *
   * Common Use Cases:
   * - Apparel: Colors, sizes, materials, fit types
   * - Footwear: Colors, sizes, width options
   * - Electronics: Storage capacity, color variants
   * - Furniture: Materials, colors, configurations
   *
   * Frontend Integration:
   * - Renders as interactive option selectors
   * - Validates customer selections against available values
   * - Updates product pricing based on selected options
   * - Stores selections in cart items and orders
   *
   * @since 1.0.0
   */
  class ProductOption extends Model {
    static associate(models) {
      ProductOption.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      ProductOption.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }

  ProductOption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shape: {
        type: DataTypes.ENUM("square", "circle"),
        allowNull: true,
        defaultValue: "square",
      },
      radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("text", "color"),
        allowNull: true,
        defaultValue: "text",
      },
      values: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductOption",
      tableName: "product_options",
      timestamps: false,
    },
  );

  return ProductOption;
};
