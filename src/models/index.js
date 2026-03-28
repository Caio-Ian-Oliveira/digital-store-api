const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

// 🔥 Força o bundle incluir o mysql2 (ESSENCIAL na Vercel)
require("mysql2");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/database")[env];

let sequelize = null;
let db = null;

// Helper to convert kebab-case to PascalCase
const toPascalCase = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

// ✅ Inicializa o Sequelize apenas quando necessário
function getSequelize() {
  if (!sequelize) {
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
      );
    }
  }
  return sequelize;
}

// ✅ Inicializa os models sob demanda (serverless-safe)
function initModels() {
  if (db) return db;

  const sequelizeInstance = getSequelize();
  const dbLocal = {};

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        !file.endsWith(".test.js")
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file));
      const modelInstance = model(
        sequelizeInstance,
        Sequelize.DataTypes
      );

      const modelName = toPascalCase(file.replace(".js", ""));
      dbLocal[modelName] = modelInstance;
    });

  // Associações
  Object.keys(dbLocal).forEach((modelName) => {
    if (dbLocal[modelName].associate) {
      dbLocal[modelName].associate(dbLocal);
    }
  });

  dbLocal.sequelize = sequelizeInstance;
  dbLocal.Sequelize = Sequelize;

  db = dbLocal;
  return db;
}

module.exports = {
  initModels,
};