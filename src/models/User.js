import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    professionalDetails: {
      type: String,
      required: true,
    },
    certifications: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
