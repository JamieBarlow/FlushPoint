import "dotenv/config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    // Connect to dev or prod DB depending on environment
    const env = process.env.NODE_ENV || "development";
    const uri =
      env === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;
    const conn = await connect(`${uri}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error: any) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
