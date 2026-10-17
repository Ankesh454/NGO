import express from "express";
import { body, validationResult } from "express-validator";

import { adminLogin } from "../controllers/auth.controller.js";
import protectAdmin from "../middlewares/auth.middleware.js";

const router = express.Router();

const validateLogin = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required"),
];

router.post("/login", validateLogin, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid login details",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
}, adminLogin);

router.get("/me", protectAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin access granted",
    admin: {
      id: req.user.id,
      role: req.user.role,
    },
  });
});

export default router;