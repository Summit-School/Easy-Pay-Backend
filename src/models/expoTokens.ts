import { timeStamp } from "console";
import mongoose from "mongoose";

const expoTokensSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ExpoTokens", expoTokensSchema);
