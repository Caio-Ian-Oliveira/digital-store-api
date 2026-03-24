const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * Order Model - Permanent record of completed purchase transactions
   *
   * @class Order
   * @description Immutable record of customer purchase transactions created during
   * checkout process. Captures complete order details including pricing, customer
   * information, shipping address, payment details, and order status tracking.
   *
   * @example
   * // Create order from cart during checkout
   * const order = await Order.create({
   *   user_id: userId,
   *   subtotal: 299.98,
   *   shipping: 15.00,
   *   discount: 30.00,
   *   total: 284.98,
   *   personal_info: {
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     phone: '+1234567890'
   *   },
   *   delivery_address: {
   *     street: '123 Main St',
   *     city: 'Anytown',
   *     state: 'CA',
   *     zip: '12345',
   *     country: 'US'
   *   },
   *   payment_info: {
   *     method: 'credit_card',
   *     last_four: '4567',
   *     transaction_id: 'txn_123456789'
   *   }
   * });
   *
   * Business Rules:
   * - Orders are immutable once created (audit trail)
   * - Total = subtotal + shipping - discount
   * - Status progresses through defined workflow states
   * - Personal/delivery/payment info stored as JSON for flexibility
   * - Order creation atomically clears user's cart
   *
   * Status Workflow:
   * - pending: Payment processing or awaiting confirmation
   * - completed: Order confirmed and ready for fulfillment
   * - shipped: Order dispatched to customer
   * - delivered: Order received by customer
   * - cancelled: Order cancelled (before shipping)
   *
   * Relationships:
   * - belongsTo User: Order belongs to the purchasing user
   * - hasMany OrderItem: Order contains purchased product line items
   *
   * Key Features:
   * - Complete order audit trail with pricing snapshot
   * - Flexible JSON storage for customer/shipping/payment data
   * - Status tracking through fulfillment lifecycle
   * - Historical price preservation (price at time of purchase)
   * - Support for complex pricing (subtotal, shipping, discounts)
   *
   * Financial Calculations:
   * - subtotal: Sum of all order items (quantity × price_at_purchase)
   * - shipping: Delivery charges based on location/method
   * - discount: Applied coupons, promotions, or loyalty rewards
   * - total: Final amount charged to customer
   *
   * @since 1.0.0
   */
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled", "shipped", "delivered"),
        allowNull: false,
        defaultValue: "completed",
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      shipping: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      personal_info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      payment_info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      underscored: true,
    },
  );

  return Order;
};
