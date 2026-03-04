const { verifyToken } = require("./jwt");

function authVerificationMiddleware(req, res, next) {
  let token = null;

  // Obter token exclusivamente do cookie HTTP-Only (seguro contra XSS)
  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  req.user = payload; // Disponibiliza o payload do token para as próximas camadas
  next();
}

module.exports = authVerificationMiddleware;
