import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
    cfa: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rate", rateSchema);
