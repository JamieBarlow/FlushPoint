import { Request, Response } from "express";

const renderRegister = (req: Request, res: Response) => {
  res.send("Register User");
};

const renderLogin = (req: Request, res: Response) => {
  res.send("Login page");
};

const registerUser = (req: Request, res: Response) => {
  // @route /
  // @access Public

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

const userController = {
  renderRegister,
  renderLogin,
  registerUser,
  loginUser,
};

export default userController;
