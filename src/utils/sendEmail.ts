import { createTransport } from "nodemailer";
import path from "path";
import fs from "fs/promises";

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (email: string, otp: string) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "otpEmailTemplate.html"
  );
  let html = await fs.readFile(templatePath, "utf-8");
  html = html.replace("{{OTP_CODE}}", otp);

  const info = transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to: email,
    subject: "2FA Verification",
    html,
  });

  return info;
};

export default sendEmail;
