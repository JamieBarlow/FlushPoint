import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router
  .route("/register")
  .get(userController.renderRegister)
  .post(userController.registerUser);

router
  .route("/login")
  .get(userController.renderLogin)
  .post(userController.loginUser);

export default router;
