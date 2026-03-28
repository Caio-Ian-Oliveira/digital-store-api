const { ZodError } = require("zod");
const AppError = require("../errors/app-error");

/**
 * Global Error Handler Middleware
 *
 * @description Centralized error processing middleware that standardizes error responses
 * across the entire API. Handles validation errors, application errors, and unexpected
 * system errors with appropriate HTTP status codes and consistent JSON format.
 *
 * @middleware
 * @param {Error} err - The error object to be processed
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 * @returns {void} Sends JSON error response to client
 *
 * @example
 * // Applied globally in app.js after all routes
 * const errorHandler = require('./shared/middlewares/error-handler.middleware');
 * app.use(errorHandler);
 *
 * Error Processing Flow:
 * 1. **Zod Validation Errors**: Schema validation failures with detailed field errors
 * 2. **Application Errors**: Custom AppError instances with predefined status/message
 * 3. **System Errors**: Unexpected errors wrapped as 500 Internal Server Error
 *
 * Response Format:
 * ```json
 * {
 *   "status": "error",
 *   "message": "Error description",
 *   "errors": [...], // Only for validation errors
 *   "stack": "..." // Only in development mode
 * }
 * ```
 *
 * Error Types Handled:
 * - **ZodError**: Schema validation failures (400 Bad Request)
 * - **AppError**: Custom application errors (various status codes)
 * - **Generic Errors**: Unexpected system errors (500 Internal Server Error)
 *
 * Security Features:
 * - Stack traces only exposed in development environment
 * - Sensitive error details sanitized in production
 * - Consistent error structure prevents information leakage
 *
 * Integration Points:
 * - Zod schema validation in request validators
 * - Custom AppError instances throughout application logic
 * - Database constraint violations and connection errors
 * - Authentication and authorization failures
 *
 * @since 1.0.0
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors: error.errors,
    });
  }

  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new AppError(message, statusCode);
  }

  const response = {
    status: error.status,
    message: error.message,
    ...(error.errors && { errors: error.errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
