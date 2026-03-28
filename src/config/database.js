require("dotenv").config();

/**
 * Database Configuration for Sequelize ORM
 *
 * @description Multi-environment database configuration supporting development,
 * testing, and production deployments. Uses MySQL as the primary database engine
 * with environment-specific settings for connection pooling, logging, and schema management.
 *
 * @example
 * // Usage in models/index.js
 * const config = require('../config/database');
 * const sequelize = new Sequelize(
 *   config[env].database,
 *   config[env].username,
 *   config[env].password,
 *   config[env]
 * );
 *
 * Environment Variables Required:
 * - DB_USER: Database username
 * - DB_PASSWORD: Database password
 * - DB_NAME: Main database name
 * - DB_NAME_TEST: Test database name (separate from main)
 * - DB_HOST: Database server host (default: 127.0.0.1)
 * - DB_PORT: Database server port (default: 3306)
 *
 * Configuration Features:
 * - **Environment Separation**: Isolated configs for dev/test/prod
 * - **Fallback Values**: Sensible defaults for local development
 * - **Schema Conventions**: Standardized table naming and timestamps
 * - **Test Isolation**: Separate database for running test suites
 * - **Production Security**: Environment variables required in production
 *
 * Sequelize Settings:
 * - timestamps: true - Automatic created_at/updated_at columns
 * - underscored: true - Snake_case column naming convention
 * - dialect: mysql - MySQL database engine
 *
 * @since 1.0.0
 */
module.exports = {
  // Local development configuration with fallback values
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3307,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
