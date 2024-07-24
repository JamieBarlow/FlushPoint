import express from "express";
import bathroomController from "../controllers/bathroomController";
import requireLogin from "../middleware/requireLogin";

const router = express.Router();

router.route("/").post(bathroomController.createBathroom);

export default router;