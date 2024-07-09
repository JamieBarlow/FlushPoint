import { Schema, model, connect } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const user = model("User", userSchema);

export default user;
