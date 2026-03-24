const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * Cart Model - Shopping cart container for temporary product storage
   *
   * @class Cart
   * @description Manages the main shopping cart entity for each user. Each user
   * has exactly one cart that persists across sessions until checkout. Serves
   * as the parent container for cart items and calculates totals.
   *
   * @example
   * // User's cart is automatically created when first needed
   * const cart = await Cart.findOne({
   *   where: { user_id: userId },
   *   include: [{ model: CartItem, as: 'items' }]
   * });
   *
   * Business Rules:
   * - One cart per user (unique constraint on user_id)
   * - Cart persists across user sessions for convenience
   * - Cart is cleared after successful order placement
   * - Automatic cart creation when user adds first item
   * - Cart items cascade delete when cart is removed
   *
   * Relationships:
   * - belongsTo User: Each cart belongs to exactly one user
   * - hasMany CartItem: Cart contains multiple product items
   *
   * Key Features:
   * - Persistent shopping cart across sessions
   * - Automatic total calculation through related items
   * - Supports guest cart conversion to user cart
   * - Optimistic locking for concurrent cart operations
   * - Clean separation between temporary cart and permanent orders
   *
   * Lifecycle:
   * 1. Created when user adds first product
   * 2. Persists through user session and between visits
   * 3. Modified as user adds/removes/updates items
   * 4. Cleared after successful checkout/order creation
   * 5. Can be manually cleared by user
   *
   * @since 1.0.0
   */
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "items",
        onDelete: "CASCADE",
      });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      underscored: true,
      timestamps: true,
    },
  );

  return Cart;
};
