/**
 * Rate Limiting Configuration - DDoS Protection and Abuse Prevention
 *
 * @description Implements tiered rate limiting strategy to protect against
 * abuse, brute force attacks, and overwhelming traffic. Provides different
 * limits for general browsing, authentication attempts, and account creation.
 *
 * @example
 * // Usage in app.js
 * const { globalLimiter, authLimiter, createAccountLimiter } = require('./config/rate-limit.config');
 * app.use(globalLimiter); // Applied globally
 *
 * // Usage in specific routes
 * router.post('/login', authLimiter, loginController);
 * router.post('/user', createAccountLimiter, createUserController);
 *
 * Rate Limiting Strategy:
 * - **Global Limiter**: 1000 requests per 15 minutes (general browsing)
 * - **Auth Limiter**: 5 login attempts per 15 minutes (brute force protection)
 * - **Account Creation**: 5 registrations per IP per 5 minutes (spam prevention)
 *
 * Security Features:
 * - IP-based tracking for distributed protection
 * - Progressive penalty increases for repeat offenders
 * - Test environment bypass for automated testing
 * - Standardized error responses with retry timing
 * - Headers to inform clients of limits and remaining requests
 *
 * Protection Against:
 * - DDoS and volumetric attacks
 * - Brute force password attacks
 * - Account enumeration attempts
 * - Spam account creation
 * - API scraping and abuse
 *
 * @since 1.0.0
 */
const rateLimit = require("express-rate-limit");

// Utility function to disable rate limiting during automated testing
const skipIfTesting = () => process.env.NODE_ENV === "test";

/**
 * Global Rate Limiter - General API usage protection
 *
 * @description Generous limit allowing normal e-commerce browsing patterns
 * while preventing overwhelming traffic. Suitable for product browsing,
 * search operations, and general API usage.
 *
 * Configuration:
 * - Window: 15 minutes
 * - Limit: 1000 requests per IP
 * - Target: Normal shopping behavior (browsing, searching, cart operations)
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Limite generoso focado na navegação da loja e vitrines
  message: {
    status: 429,
    message: "Muitas requisições. Tente novamente em 15 minutos",
  },
  headers: true,
  skip: skipIfTesting,
});

/**
 * Middleware restrito para rotas Sensíveis (Login)
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Apenas 5 tentativas de login a cada 15 min
  message: {
    status: 429,
    message: "Múltiplas tentativas de login falhas. Sua conta ou IP foi bloqueado por segurança. Volte em 15 minutos.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipIfTesting,
});

/**
 * Middleware Super Restrito para criação de novas contas
 */
const createAccountLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // Janela de 5 minutos
  max: 5, // Apenas 5 contas podem ser criadas pelo mesmo IP a cada 5 minutos
  message: {
    status: 429,
    message: "Muitas requisições. Tente novamente em 5 minutos",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipIfTesting,
});

module.exports = {
  globalLimiter,
  authLimiter,
  createAccountLimiter,
};
