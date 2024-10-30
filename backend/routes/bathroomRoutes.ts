import express from "express";
import bathroomController from "../controllers/bathroomController";
import requireLogin from "../middleware/requireLogin";
import seedDB from "../seeds/seedDB";
import wrapAsync from "../middleware/wrapAsync";
import sanitizeBathroom from "../middleware/sanitizeBathroom";
import validateBathroom from "../middleware/validateBathroom";

const router = express.Router();

router
  .route("/")
  .get(wrapAsync(bathroomController.showBathroomsIndex))
  .post(
    sanitizeBathroom,
    validateBathroom,
    wrapAsync(bathroomController.createBathroom)
  );

router.route("/seedDB").post(seedDB);

router.route("/:id").get(wrapAsync(bathroomController.showBathroom));

export default router;
