import mongoose from "mongoose";

const popupMessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PopupMessage", popupMessageSchema);
