/**
 * Async Handler Middleware - Express async/await error handling wrapper
 *
 * @description Higher-order function that wraps async route handlers and middleware
 * to automatically catch Promise rejections and pass them to Express error handling.
 * Eliminates the need for manual try-catch blocks in every async route.
 *
 * @param {Function} fn - Async function to wrap (route handler or middleware)
 * @returns {Function} Express middleware function with automatic error handling
 *
 * @example
 * // Wrap async route handlers
 * const asyncHandler = require('./shared/middlewares/async-handler.middleware');
 *
 * router.get('/users/:id', asyncHandler(async (req, res) => {
 *   const user = await User.findByPk(req.params.id); // If this throws, error is caught
 *   res.json(user);
 * }));
 *
 * // Instead of manual try-catch:
 * router.get('/users/:id', async (req, res, next) => {
 *   try {
 *     const user = await User.findByPk(req.params.id);
 *     res.json(user);
 *   } catch (error) {
 *     next(error);
 *   }
 * });
 *
 * Key Benefits:
 * - **Cleaner Code**: Eliminates repetitive try-catch blocks
 * - **Consistent Error Handling**: All async errors properly forwarded to error handler
 * - **Promise Safety**: Automatically catches unhandled Promise rejections
 * - **Express Integration**: Seamlessly integrates with Express error middleware
 *
 * Error Flow:
 * 1. Async function executes within Promise.resolve()
 * 2. Any thrown error or rejected Promise is caught by .catch()
 * 3. Error is passed to next() function for Express error handling
 * 4. Global error handler middleware processes the error
 *
 * Usage Patterns:
 * - Route handlers with database operations
 * - Authentication middleware with async validation
 * - File upload processing with external services
 * - API calls to external services
 * - Complex business logic with multiple async operations
 *
 * @see {@link ../middlewares/error-handler.middleware.js} - Global error handler that processes caught errors
 * @since 1.0.0
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
