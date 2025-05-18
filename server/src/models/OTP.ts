import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10 * 60 * 1000, // 10Min in milliseconds
  },
});

const OTP = mongoose.model("OTP", OtpSchema);

export default OTP;
