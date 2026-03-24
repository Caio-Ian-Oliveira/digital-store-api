/**
 * Role-Based Access Control (RBAC) Middleware
 *
 * @class RoleGuard
 * @description Implements role-based authorization for protecting API routes.
 * Verifies that authenticated users have sufficient permissions to access
 * protected endpoints based on their assigned role (USER or ADMIN).
 *
 * @example
 * // Protect admin-only routes
 * const roleGuard = require('./shared/middlewares/role-guard.middleware');
 * router.post('/admin/users', authMiddleware, roleGuard.handle(['ADMIN']), createUser);
 *
 * // Allow both users and admins
 * router.get('/profile', authMiddleware, roleGuard.handle(['USER', 'ADMIN']), getProfile);
 *
 * // Default admin-only protection
 * router.delete('/products/:id', authMiddleware, roleGuard.handle(), deleteProduct);
 *
 * Authorization Flow:
 * 1. **Prerequisites**: User must be authenticated (req.user populated by auth middleware)
 * 2. **Role Check**: Verify user.role exists in allowedRoles array
 * 3. **Success**: Call next() to continue to route handler
 * 4. **Failure**: Return 403 Forbidden with error message
 *
 * Security Features:
 * - Consistent error responses prevent information leakage
 * - Graceful handling of missing authentication data
 * - Configurable role requirements per route
 * - Protection against role escalation attacks
 *
 * @since 1.0.0
 */
class RoleGuard {
  /**
   * Creates role-based authorization middleware
   *
   * @param {string[]} allowedRoles - Array of roles permitted to access the route
   * @returns {Function} Express middleware function for role verification
   *
   * @example
   * // Admin-only access
   * roleGuard.handle(['ADMIN'])
   *
   * // Multi-role access
   * roleGuard.handle(['USER', 'ADMIN'])
   *
   * Supported Roles:
   * - **USER**: Standard customer accounts with basic permissions
   * - **ADMIN**: Administrative accounts with elevated permissions
   *
   * Error Responses:
   * - 401 Unauthorized: User not authenticated (missing req.user)
   * - 403 Forbidden: User lacks required role permissions
   * - 500 Internal Server Error: Unexpected authorization processing error
   */
  handle(allowedRoles = ["ADMIN"]) {
    return (req, res, next) => {
      try {
        const user = req.user;
        if (!user) {
          return res.status(401).json({ error: "Usuário não autenticado" });
        }
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({ error: "Acesso negado: permissão insuficiente" });
        }
        return next();
      } catch (_err) {
        return res.status(500).json({ error: "Erro interno de autorização" });
      }
    };
  }
}

module.exports = new RoleGuard();
