const swaggerJSDoc = require("swagger-jsdoc");

/**
 * Swagger/OpenAPI 3.0 Documentation Configuration
 *
 * @description Comprehensive API documentation generator using swagger-jsdoc.
 * Automatically discovers and compiles @swagger annotations from controllers
 * into interactive API documentation accessible at /api-docs endpoint.
 *
 * @example
 * // Usage in app.js
 * const swaggerUi = require('swagger-ui-express');
 * const swaggerSpec = require('./config/swagger');
 * app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 *
 * // Controller annotation example
 * /**
 *  * @swagger
 *  * /v1/products:
 *  *   get:
 *  *     summary: Search products
 *  *     tags: [Products]
 *  *     responses:
 *  *       200:
 *  *         description: Products found successfully
 *  * /
 *
 * Documentation Features:
 * - **Interactive Testing**: Built-in API testing interface
 * - **Authentication Support**: JWT Bearer token integration
 * - **Schema Validation**: Request/response schema documentation
 * - **Multi-Environment**: Server configurations for different environments
 * - **Auto-Discovery**: Scans all controller files for @swagger annotations
 *
 * Security Configuration:
 * - Bearer Authentication scheme for protected endpoints
 * - JWT token format specification
 * - Consistent authentication patterns across all secured routes
 *
 * API Coverage:
 * - User authentication and management (6 endpoints)
 * - Product catalog and search (6 endpoints)
 * - Category management (5 endpoints)
 * - Shopping cart operations (5 endpoints)
 * - Order processing and history (5 endpoints)
 * - System health and admin functions (2 endpoints)
 *
 * @since 1.0.0
 */

// OpenAPI 3.0 specification definition with metadata and security schemes
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Digital Store API",
    version: "1.0.0",
    description: "Documentação da API Digital Store",
  },
  servers: [
    {
      url: process.env.API_URL || "http://localhost:3000",
      description: "Servidor Principal",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.js"], // Caminho para os arquivos de rotas/controllers
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
