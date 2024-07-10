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
  const { username, email, password } = req.body;
  // Form validation
  if (!username || !email || !password) {
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
    username,
    email,
    password: hashedPassword,
    isAdmin: false,
  });
  await user.save();

  // Confirmation
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new AppError("invalid user data", 400);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  let validPassword;
  if (user) {
    validPassword = await bcrypt.compare(password, user.password);
  }
  if (validPassword) {
    res.send("User logged in successfully");
  } else {
    res.send("Invalid username or password");
  }
};

const userController = {
  renderRegister,
  renderLogin,
  registerUser,
  loginUser,
};

export default userController;
