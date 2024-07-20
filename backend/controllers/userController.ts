import { Request, Response } from "express";
import User from "../models/userModel";
import AppError from "../middleware/AppError";
import bcrypt from "bcrypt";
import { IUser } from "../models/userModel";

const renderRegister = (req: Request, res: Response) => {
  res.send("Register User");
};

const renderLogin = (req: Request, res: Response) => {
  res.send("Login page");
};

declare module "express-session" {
  interface SessionData {
    user: Omit<IUser, "password">;
  }
}

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
    const { isAdmin } = user;
    req.session.user = {
      username,
      email,
      isAdmin,
    };
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
    if (validPassword) {
      const { email, isAdmin } = user;
      req.session.user = {
        username,
        email,
        isAdmin,
      };
      console.log(`${req.sessionID}`.bgGreen);
      console.log(`${JSON.stringify(req.session)}`.bgBlue);
      res.send("User logged in successfully");
    } else {
      res.status(403).send("Invalid username or password");
    }
  } else {
    res.status(403).send("Invalid username or password");
  }
};

const testLogin = async (req: Request, res: Response) => {
  if (!req.session.user) {
    res.send("You're not logged in, sorry");
  } else if (req.session.user.username) {
    res.send("You're logged in!");
  } else {
    res.status(403).send("Unknown error");
  }
};

const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session", err);
      res.status(500).send("Error logging out");
    }
    res.send("Logged out successfully");
  });
};

const userController = {
  renderRegister,
  renderLogin,
  registerUser,
  loginUser,
  testLogin,
  logoutUser,
};

export default userController;
