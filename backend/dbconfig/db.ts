import "dotenv/config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error: any) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
