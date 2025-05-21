import { Router, Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User";
import Token from "../models/Token";
import OTP from "../models/OTP";
import sendEmail from "../utils/sendEmail";

const router = Router();

// Login API
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    // validate body of API
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password"),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    // check if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ msg: "Invalid Email or Password" });

    // verify password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ msg: "Invalid Email or Password" });

    // generate otp and send email
    const otpNum = crypto.randomInt(100000, 1000000).toString();
    const otpInfo = await new OTP({ email: user.email, otp: otpNum }).save();
    await sendEmail(otpInfo.email, otpInfo.otp);

    res.status(200).json({ msg: "OTP Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Verify OTP & Generate Tokens
router.post("/2fa", async (req: Request, res: Response): Promise<any> => {
  try {
    // validate body of API
    const schema = Joi.object({
      email: Joi.string().email().required().label("Email"),
      otp: Joi.string().required().label("OTP"),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    // check email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "Something went wrong!" });

    // check otp
    const otpInfo = await OTP.findOne({
      email: req.body.email,
      otp: req.body.otp,
    });
    if (!otpInfo) return res.status(400).json({ msg: "Invalid OTP Entered" });

    // generate tokens
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: "14m" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { expiresIn: "24h" }
    );

    await Token.deleteOne({ _id: user._id });
    await new Token({ _id: user._id, token: refreshToken }).save();

    // save the tokens in cookies
    res.cookie(
      "accessToken",
      { accessToken },
      {
        sameSite: "none",
        secure: true,
        path: "/",
        httpOnly: true,
        partitioned: true,
        maxAge: 14 * 60 * 1000, // 14 minutes in milliseconds
      }
    );
    res.cookie(
      "refreshToken",
      { refreshToken },
      {
        sameSite: "none",
        secure: true,
        path: "/",
        partitioned: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      }
    );
    res.status(200).json({ msg: "Logged In Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Refresh Token API
router.post(
  "/refreshToken",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const token = req.cookies.refreshToken?.refreshToken;
      if (!token)
        return res.status(401).json({ message: "Token Not Provided" });

      // verify refresh token
      const payload: any = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!
      );

      const tokenDetails = await Token.findById(payload._id);
      if (!tokenDetails || tokenDetails.token !== req.body.refreshToken)
        return res.status(403).json({ msg: "Invalid Refresh Token" });

      // generate new access token
      const accessToken = jwt.sign(
        { _id: tokenDetails._id },
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        { expiresIn: "14m" }
      );

      res.cookie(
        "accessToken",
        { accessToken },
        {
          sameSite: "none",
          path: "/",
          httpOnly: true,
          partitioned: true,
          maxAge: 14 * 60 * 1000, // 14 minutes in milliseconds
          secure: true,
        }
      );
      res.status(200).json({ msg: "New Access Token Generated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// Logout API
router.post("/logout", async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("accessToken", {
      sameSite: "none",
      httpOnly: true,
      partitioned: true,
      secure: true,
    });
    res.clearCookie("refreshToken", {
      sameSite: "none",
      partitioned: true,
      secure: true,
    });
    res.status(200).json({ msg: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
