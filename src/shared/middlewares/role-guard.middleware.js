class RoleGuard {
  /**
   * Middleware para proteger rotas de acordo com papéis permitidos
   * @param {string[]} allowedRoles - Papéis permitidos (default: ["ADMIN"])
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
