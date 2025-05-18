import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String, required: true },
  avatar: { type: String, require: true },
});

const User = mongoose.model("user", userSchema);

export default User;
