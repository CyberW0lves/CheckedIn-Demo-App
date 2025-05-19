import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "./dbConnect";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
