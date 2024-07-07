import { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  res.send("Register Route");
};

const loginUser = (req: Request, res: Response) => {
  res.send("Login Route");
};

export { registerUser, loginUser };
