import { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  console.log(req.body);
  res.send("Register route");
};

const loginUser = (req: Request, res: Response) => {
  res.send("Login Route");
};

export { registerUser, loginUser };
