const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * OrderItem Model - Line items within a completed purchase order
   *
   * @class OrderItem
   * @description Immutable record of individual products purchased within an order.
   * Preserves product details and pricing at the time of purchase to maintain
   * historical accuracy even if the original product is modified or deleted.
   *
   * @example
   * // Order item created during checkout process
   * const orderItem = await OrderItem.create({
   *   order_id: order.id,
   *   product_id: 123, // May be null if product deleted
   *   product_name: 'Premium Running Shoes',
   *   image_url: 'https://cdn.example.com/shoes.jpg',
   *   quantity: 2,
   *   price_at_purchase: 149.99,
   *   selected_color: 'Navy Blue',
   *   selected_size: '10.5'
   * });
   *
   * Business Rules:
   * - Order items are immutable historical records
   * - Price captured at time of purchase (not current price)
   * - Product name/image preserved even if original product deleted
   * - Selected options (color/size) stored for fulfillment accuracy
   * - Line total = quantity × price_at_purchase
   *
   * Data Preservation Strategy:
   * - product_id: References original product (nullable for deleted products)
   * - product_name: Snapshot of product name at purchase time
   * - image_url: Preserved product image for order history
   * - price_at_purchase: Historical pricing independent of current product price
   * - selected_options: Customer's specific variant selections
   *
   * Relationships:
   * - belongsTo Order: Order item belongs to specific purchase order
   * - belongsTo Product: Optional reference to original product (if still exists)
   *
   * Key Features:
   * - Historical data preservation for audit trails
   * - Support for complex product variants (color, size)
   * - Decoupled from current product state for data integrity
   * - Complete line item details for customer service
   * - Fulfillment accuracy through preserved selections
   *
   * Use Cases:
   * - Order fulfillment and shipping
   * - Customer service and returns processing
   * - Sales reporting and analytics
   * - Product performance analysis
   * - Customer purchase history
   *
   * Data Integrity:
   * - Maintains order details even if products are discontinued
   * - Preserves exact purchase conditions for legal/tax purposes
   * - Enables accurate refunds based on original purchase price
   * - Supports customer reordering of previously purchased items
   *
   * @since 1.0.0
   */
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price_at_purchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
      modelName: "OrderItem",
      tableName: "order_items",
      timestamps: true,
      underscored: true,
    },
  );

  return OrderItem;
};
