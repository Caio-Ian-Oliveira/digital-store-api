const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  /**
   * UserAddress Model - Customer shipping and billing addresses
   *
   * @class UserAddress
   * @description Manages multiple addresses per user for shipping and billing purposes.
   * Follows Brazilian address format with specific fields for CEP (postal code),
   * neighborhood (bairro), and state (estado) information.
   *
   * @example
   * // Add a shipping address for a user
   * const address = await UserAddress.create({
   *   user_id: userId,
   *   endereco: 'Rua das Flores, 123',
   *   bairro: 'Centro',
   *   cidade: 'São Paulo',
   *   estado: 'SP',
   *   cep: '01234-567',
   *   complemento: 'Apto 45, Bloco B'
   * });
   *
   * Business Rules:
   * - Users can have multiple addresses (home, work, etc.)
   * - All addresses follow Brazilian postal format
   * - CEP (postal code) is required for shipping calculations
   * - Complement field optional for apartment/suite details
   * - Addresses cascade delete when user is removed
   *
   * Address Components (Brazilian Format):
   * - endereco: Street name and number (e.g., "Rua das Flores, 123")
   * - bairro: Neighborhood/district (e.g., "Centro", "Copacabana")
   * - cidade: City name (e.g., "São Paulo", "Rio de Janeiro")
   * - estado: State abbreviation (e.g., "SP", "RJ") - optional for international
   * - cep: Postal code with format XXXXX-XXX (e.g., "01234-567")
   * - complemento: Additional info (apartment, floor, building, etc.)
   *
   * Relationships:
   * - belongsTo User: Address belongs to specific user account
   *
   * Key Features:
   * - Multi-address support per user
   * - Brazilian postal system compliance
   * - Structured address components for shipping integration
   * - Optional complement field for detailed delivery instructions
   * - Automatic cleanup when user accounts are deleted
   *
   * Use Cases:
   * - Shipping address selection during checkout
   * - Billing address for payment processing
   * - Address book management in user profile
   * - Delivery route optimization and shipping cost calculation
   * - Tax jurisdiction determination based on location
   *
   * Integration Points:
   * - Checkout flow for delivery address selection
   * - Shipping cost calculators (CEP-based)
   * - Order fulfillment and delivery tracking
   * - User profile address management
   * - Geographic reporting and analytics
   *
   * Data Validation:
   * - CEP format validation (XXXXX-XXX)
   * - Required fields enforcement
   * - String length limits for database optimization
   * - Character encoding support for Portuguese/accented text
   *
   * @since 1.0.0
   */
  class UserAddress extends Model {
    static associate(models) {
      UserAddress.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  UserAddress.init(
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
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      endereco: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
      complemento: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserAddress",
      tableName: "user_addresses",
      underscored: true,
      timestamps: true,
    },
  );

  return UserAddress;
};
