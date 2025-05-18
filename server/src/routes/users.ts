import { Router, Request, Response } from "express";
import Joi from "joi";
import multer from "multer";
import bcrypt from "bcrypt";

import User from "../models/User";
import imgUpload from "../utils/imgUpload";
import auth from "../middlewares/auth";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

interface MyRequest extends Request {
  user?: { id: string };
}

// Create User Account
router.post(
  "/",
  upload.single("avatar"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      // validate the image type
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!req.file)
        return res.status(400).json({ msg: "Avatar img is required." });

      if (!allowedTypes.includes(req.file.mimetype))
        return res
          .status(400)
          .json({ msg: "Only PNG and JPG images are allowed" });

      // validate body of the API
      const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
        dob: Joi.string().required().label("Date Of Birth"),
        company: Joi.string().required().label("Company"),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });

      // check user with given email already exists
      const user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).json({ msg: "User Already Exists" });

      // uploading avatar to cloud
      const avatarUrl = await imgUpload(req.file);

      // encrypting user password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      // save user details
      await new User({
        ...req.body,
        password: hashPassword,
        avatar: avatarUrl,
      }).save();
      res.status(200).json({ msg: "Account Created Sccessfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal Server Error!" });
    }
  }
);

// Get User Details
router.get("/me", auth, async (req: MyRequest, res: Response) => {
  try {
    const data = await User.findById(req.user?.id).select("-password");
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error!" });
  }
});

// Delete User Account
router.delete("/me", auth, async (req: MyRequest, res: Response) => {
  try {
    await User.findByIdAndDelete(req.user?.id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "Account Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error!" });
  }
});

export default router;
