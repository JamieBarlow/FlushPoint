import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/userController";
import errorHandler from "../middleware/errorhandler";
import "colors";
import connectDB from "../dbconfig/db";

const port = 8000;
const app = express();
const router = express.Router();

// For parsing JSON request data
app.use(express.json());
// Use built-in middleware to parse x-www-form-urlencoded request body data
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/", router);
router.get("/", (req: Request, res: Response) => {
  res.send("Testing Express & TS setup");
});
router.post("/register", registerUser);
router.post("/login", loginUser);

// Custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`now listening on port ${port}`.red.underline.bold);
  connectDB();
});
