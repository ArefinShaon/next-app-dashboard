import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
      useCreateIndex: true, // Ensure indexes are created automatically
      useFindAndModify: false, // Use the new methods for find and modify
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection failed:", error.message);
    throw error;
  }
};

export default connect;
