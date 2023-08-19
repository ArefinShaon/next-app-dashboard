import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {

    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection failed:", error.message);
    throw error;
  }
};

export default connect;
