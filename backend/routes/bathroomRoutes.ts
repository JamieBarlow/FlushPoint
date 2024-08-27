import express from "express";
import bathroomController from "../controllers/bathroomController";
import requireLogin from "../middleware/requireLogin";
import seedDB from "../seeds/seedDB";

const router = express.Router();

router
  .route("/")
  .get(bathroomController.showBathroomsIndex)
  .post(bathroomController.createBathroom);

router.route("/seedDB").post(seedDB);

router.route("/:id").get(bathroomController.showBathroom);

export default router;
