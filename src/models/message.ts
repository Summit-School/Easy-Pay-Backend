import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: Array,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
