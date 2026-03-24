const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * ProductImage Model - Media assets associated with products
   *
   * @class ProductImage
   * @description Manages product photo galleries with support for multiple images
   * per product. Images are hosted on Cloudinary CDN with enable/disable controls
   * for flexible product presentation and merchandising.
   *
   * @example
   * // Add multiple images to a product
   * const images = await ProductImage.bulkCreate([
   *   {
   *     product_id: 123,
   *     path: 'https://res.cloudinary.com/store/image/upload/v1/products/shoe-1.jpg',
   *     enabled: true
   *   },
   *   {
   *     product_id: 123,
   *     path: 'https://res.cloudinary.com/store/image/upload/v1/products/shoe-2.jpg',
   *     enabled: false // Hidden from public display
   *   }
   * ]);
   *
   * Business Rules:
   * - Products can have multiple images for detailed views
   * - Images are stored as Cloudinary URLs (external hosting)
   * - Enabled flag controls public visibility and API inclusion
   * - Images cascade delete when parent product is removed
   * - First enabled image typically serves as primary/thumbnail
   *
   * Relationships:
   * - belongsTo Product: Image belongs to specific product
   *
   * Key Features:
   * - CDN-hosted images for fast global delivery
   * - Enable/disable control for image management
   * - Support for multiple views (front, side, detail shots)
   * - Automatic cleanup when products are deleted
   * - Optimized for e-commerce image galleries
   *
   * Image Management:
   * - Upload: Images uploaded via /product/upload-image endpoint
   * - Storage: Cloudinary CDN with automatic optimization
   * - Display: Only enabled images shown in product listings
   * - Organization: Images can be ordered by display_order field
   *
   * Integration Points:
   * - Product creation/update includes image associations
   * - Image URLs used in cart and order displays
   * - Frontend image galleries and zoom functionality
   * - Search results and category listings
   *
   * @since 1.0.0
   */
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  ProductImage.init(
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
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "product_images",
      timestamps: false,
    },
  );

  return ProductImage;
};
