import mongoose from "mongoose";
import path from "path";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsCAFile: path.resolve("global-bundle.pem"),
      retryWrites: false,
    });

    console.log("Successfully connected to Amazon DocumentDB");
  } catch (error) {
    console.error("ERROR connecting to DocumentDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
