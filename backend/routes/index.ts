import "dotenv/config";
import express, { Request, Response } from "express";
import errorHandler from "../middleware/errorhandler";
import "colors";
import connectDB from "../dbconfig/db";
import userRoutes from "./userRoutes";
import session from "express-session";

const port = 8000;
const app = express();

// Session
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
  })
);
// For parsing JSON request data
app.use(express.json());
// Use built-in middleware to parse x-www-form-urlencoded request body data
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/users", userRoutes);

// Custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`now listening on port ${port}`.red.underline.bold);
  connectDB();
});
