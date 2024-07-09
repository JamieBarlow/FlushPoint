import { Request, Response } from "express";
import User from "../models/userModel";
import AppError from "../middleware/AppError";
import bcrypt from "bcrypt";

const renderRegister = (req: Request, res: Response) => {
  res.send("Register User");
};

const renderLogin = (req: Request, res: Response) => {
  res.send("Login page");
};

const registerUser = async (req: Request, res: Response) => {
  // @route /users/register
  // @access Public
  const { name, email, password } = req.body;
  // Form validation
  if (!name || !email || !password) {
    res.status(400);
    throw new AppError("Please include all fields", 400);
  }
  // Validate whether user already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new AppError("User already exists", 400);
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
  });
  await user.save();

  // Confirmation
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new AppError("invalid user data", 400);
  }
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
