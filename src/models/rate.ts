import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
    cfa: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rate", rateSchema);
