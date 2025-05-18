import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const imgUpload = async (file: Express.Multer.File) => {
  const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  const result = await cloudinary.v2.uploader.upload(fileBase64);
  return result.secure_url;
};

export default imgUpload;
