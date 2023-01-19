import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
    },
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
    amountInBD: {
      type: Number,
      required: [true, "amountInBD is required"],
    },
    receiverNumber: {
      type: Number,
      required: [true, "receiverNumber is required"],
    },
    receiverName: {
      type: String,
      required: [true, "receiverName is required"],
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
