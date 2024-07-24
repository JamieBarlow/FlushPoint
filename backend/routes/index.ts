import "dotenv/config";
import express, { Request, Response } from "express";
import errorHandler from "../middleware/errorhandler";
import "colors";
import connectDB from "../dbconfig/db";
import userRoutes from "./userRoutes";
import bathroomRoutes from "./bathroomRoutes";
import session from "express-session";
import { v4 as uuid } from "uuid";
import MongoStore from "connect-mongo";

const env = process.env.NODE_ENV || "development";
const dbUrl =
  env === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
const sessionSecret =
  env === "production" ? process.env.MONGO_SESSION_SECRET : "LmARXFZ4g69fbU";

const port = 8000;
const app = express();

// For parsing JSON request data
app.use(express.json());
// Use built-in middleware to parse x-www-form-urlencoded request body data
app.use(express.urlencoded({ extended: true }));
// Session
app.use(
  session({
    genid: function (req) {
      return uuid();
    },
    secret: "some secret",
    cookie: { maxAge: 120000 },
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 60 * 60,
      crypto: {
        secret: sessionSecret!,
      },
      collectionName: "sessions",
    }),
  })
);

// Routing
app.use("/users", userRoutes);
app.use("/bathrooms", bathroomRoutes);

// Custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`now listening on port ${port}`.red.underline.bold);
  connectDB();
});
