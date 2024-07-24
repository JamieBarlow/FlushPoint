import express from "express";
import bathroomController from "../controllers/bathroomController";
import requireLogin from "../middleware/requireLogin";
import seedDB from "../seeds/seedDB";

const router = express.Router();

router
  .route("/")
  .get(bathroomController.showBathrooms)
  .post(bathroomController.createBathroom);

router.route("/seedDB").post(seedDB);

export default router;
