import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface MyRequest extends Request {
  user?: { id: string };
}

const auth = (req: MyRequest, res: Response, next: any): any => {
  const token = req.cookies.accessToken?.accessToken;
  if (!token) return res.status(401).json({ message: "Token Not Provided" });

  try {
    const payload: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!
    );
    req.user = { id: payload._id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Access Denied: Invalid Token" });
  }
};

export default auth;
