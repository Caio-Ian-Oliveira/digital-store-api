const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const { globalLimiter } = require("./config/rate-limit.config");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

const userRoutes = require("./modules/user/routes/user.routes");
const categoryRoutes = require("./modules/category/routes/category.routes");
const productRoutes = require("./modules/product/routes/product.routes");
const cartRoutes = require("./modules/cart/routes/cart.routes");
const orderRoutes = require("./modules/order/routes/order.routes");

app.use(express.json());
app.use(cookieParser()); // Limite de Taxa Global
app.use(globalLimiter);

// Rota da documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

const errorHandler = require("./shared/middlewares/error-handler.middleware");
app.use(errorHandler);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o status de saúde da API
 *     description: Endpoint simples para verificar se a API está funcionando corretamente. Usado por ferramentas de monitoramento, load balancers e verificações de disponibilidade.
 *     tags:
 *       - Sistema
 *     responses:
 *       200:
 *         description: API está funcionando corretamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "OK"
 */
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

module.exports = app;
