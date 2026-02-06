const express = require("express");
const createUserController = require("../http/controllers/create-user.controller");
const GetUserByIdController = require("../http/controllers/get-user-by-id.controller");
const LoginController = require("../http/controllers/login.controller");
const UpdateUserController = require("../http/controllers/update-user.controller");
const DeleteUserController = require("../http/controllers/delete-user.controller");
const { createUserValidator } = require("../http/validators/create-user.validator");

const authVerificationMiddleware = require("../../../shared/auth/auth-verification.middleware");
const { loginValidator } = require("../http/validators/login.validator");
const { updateUserValidator } = require("../http/validators/update-user.validator");
const router = express.Router();

router.post("/v1/user/login", loginValidator, LoginController.handle);
router.post("/v1/user", createUserValidator, createUserController.handle);
router.get("/v1/user/:id", authVerificationMiddleware, GetUserByIdController.handle);
router.patch("/v1/user/:id", authVerificationMiddleware, updateUserValidator, UpdateUserController.handle);
router.delete("/v1/user/:id", authVerificationMiddleware, DeleteUserController.handle);
module.exports = router;
