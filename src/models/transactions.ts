import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "number is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    screenshot: {
      type: String,
      required: [true, "screenshot is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
