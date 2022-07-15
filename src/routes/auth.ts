import express from "express";
import { AuthManager } from "../controller/auth";
import { body, check } from "express-validator";

const router = express.Router();

router.post(
  "/user/login",
  [
    check("email", "Invalid email").isEmail().normalizeEmail(),
    body("password", "Password length must not be less than five characters")
      .trim()
      .isLength({ min: 5 }),
  ],
  AuthManager.login
);

router.post(
  "/user/signup",
  [
    body("name", "Invalid Name input").trim().isLength({ min: 2 }),
    check("email", "Invalid Email").isEmail().normalizeEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }).trim(),
    body("confpassword", "Password do not match")
      .trim()
      .custom((value: any, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password do not match");
        }
        return true;
      }),
  ],
  AuthManager.postSignup
);

export const AuthRoutes = router;
