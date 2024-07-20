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

router.route("/logout").post(userController.logoutUser);

router.route("/secret").get(userController.testLogin);

export default router;
