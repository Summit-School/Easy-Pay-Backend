import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "phone number is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    numberOfTxn: {
      type: Number,
      default: 0,
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

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, "first name is required"],
//     },
//     lastName: {
//       type: String,
//       required: [true, "last name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       unique: true,
//     },
//     phoneNumber: {
//       type: Number,
//       required: [true, "phone number is required"],
//     },
//     password: {
//       type: String,
//       required: [true, "pasword is required"],
//     },
//     confirm_email: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

export default mongoose.model("User", userSchema);
