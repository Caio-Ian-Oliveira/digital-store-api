const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
