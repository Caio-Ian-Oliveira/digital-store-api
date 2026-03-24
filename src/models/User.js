const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  /**
   * User Model - Represents system users (customers and administrators)
   *
   * @class User
   * @description Manages user authentication, profiles, and role-based access control.
   * Supports both customer accounts (USER role) and administrative accounts (ADMIN role).
   * Implements automatic password hashing and soft delete functionality.
   *
   * @example
   * // Create a new user
   * const user = await User.create({
   *   firstname: 'John',
   *   surname: 'Doe',
   *   email: 'john@example.com',
   *   password: 'secure-password',
   *   cpf: '12345678901',
   *   phone: '85999999999'
   * });
   *
   * Business Rules:
   * - Email, CPF and phone must be unique across all active users
   * - Password is automatically hashed using bcrypt before database storage
   * - Default role is USER; only system can assign ADMIN role
   * - Soft delete support preserves user data for audit/compliance
   *
   * Relationships:
   * - hasMany UserAddress: Multiple shipping/billing addresses per user
   * - hasOne Cart: Single active shopping cart per user
   * - hasMany Order: Purchase history and order management
   *
   * Security Features:
   * - Automatic password hashing with bcrypt salt rounds (10)
   * - Role-based authentication (USER/ADMIN)
   * - Email validation at database level
   * - Paranoid delete for data retention compliance
   *
   * @since 1.0.0
   */
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserAddress, {
        foreignKey: "user_id",
        as: "addresses",
        onDelete: "CASCADE",
      });
      User.hasOne(models.Cart, {
        foreignKey: "user_id",
        as: "cart",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Segurança: role não pode ser definida pelo cliente no signup público
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        allowNull: false,
        defaultValue: "USER",
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      timestamps: true,
      underscored: true,
      paranoid: true,
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    },
  );

  return User;
};
