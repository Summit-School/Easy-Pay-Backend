import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
    cfa: {
      type: Number,
      required: [true, "rate is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rate", rateSchema);
