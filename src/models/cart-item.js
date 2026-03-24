const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * CartItem Model - Individual product selections within a shopping cart
   *
   * @class CartItem
   * @description Represents specific product selections with quantities and
   * customization options (color, size) within a user's shopping cart.
   * Handles variant selection and quantity management for complex products.
   *
   * @example
   * // Add a product with specific options to cart
   * const cartItem = await CartItem.create({
   *   cart_id: userCart.id,
   *   product_id: 123,
   *   quantity: 2,
   *   selected_color: 'Blue',
   *   selected_size: 'Large'
   * });
   *
   * Business Rules:
   * - Each item represents one product variant in the cart
   * - Quantity must be positive integer (minimum 1)
   * - Selected color/size are optional (depends on product type)
   * - Multiple cart items can reference same product with different options
   * - Total item price = product.price_with_discount × quantity
   *
   * Relationships:
   * - belongsTo Cart: Cart item belongs to specific user's cart
   * - belongsTo Product: References the actual product being purchased
   *
   * Key Features:
   * - Product variant customization (color, size selections)
   * - Flexible quantity management
   * - Support for complex product configurations
   * - Automatic price calculation based on current product pricing
   * - Option validation against available product options
   *
   * Product Options:
   * - selected_color: Color variant (e.g., "Red", "#FF0000")
   * - selected_size: Size variant (e.g., "Medium", "42", "XL")
   * - Future: Additional custom options can be easily added
   *
   * Cart Operations:
   * - Add: Create new cart item or increment existing quantity
   * - Update: Modify quantity or change selected options
   * - Remove: Delete specific cart item
   * - Clear: Remove all items (handled at Cart level)
   *
   * @since 1.0.0
   */
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  CartItem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "carts",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      selected_color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      selected_size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_items",
      underscored: true,
      timestamps: true,
    },
  );

  return CartItem;
};
