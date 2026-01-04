const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../../middlewares/validate.middleware");

// ✅ IMPORT SCHEMAS FROM VALIDATIONS
const {
  registerSchema,
  loginSchema
} = require("../../validations/auth/auth.validator");

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

module.exports = router;
