import express, { Express, Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/userController";
const port = 8000;
const app = express();
const router = express.Router();

app.use("/", router);

router.get("/", (req: Request, res: Response) => {
  res.send("Testing Express & TS setup");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
