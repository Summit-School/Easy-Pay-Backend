import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "pasword is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
