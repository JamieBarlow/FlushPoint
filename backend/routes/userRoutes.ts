import express from "express";
import userController from "../controllers/userController";
import requireLogin from "../middleware/requireLogin";

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

router.route("/secret").get(requireLogin, userController.testLogin);

// To protect multiple routes
// router.use(requireLogin)

export default router;
