const { createCategoryValidator } = require("../http/validators/create-category.validator");
const CreateCategoryController = require("../http/controllers/create-category.controller");

const express = require("express");
const authVerificationMiddleware = require("../../../shared/auth/auth-verification.middleware");
const roleGuardMiddleware = require("../../../shared/middlewares/role-guard.middleware");
const router = express.Router();

router.post(
  "/v1/category",
  authVerificationMiddleware,
  roleGuardMiddleware.handle(["ADMIN"]),
  createCategoryValidator,
  CreateCategoryController.handle,
);

module.exports = router;
