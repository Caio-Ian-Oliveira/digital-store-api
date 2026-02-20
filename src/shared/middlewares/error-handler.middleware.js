const { ZodError } = require("zod");
const AppError = require("../errors/AppError");

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
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
