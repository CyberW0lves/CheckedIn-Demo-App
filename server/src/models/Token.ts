import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60, // 24H in seconds
  },
});

const Token = mongoose.model("token", tokenSchema);

export default Token;
