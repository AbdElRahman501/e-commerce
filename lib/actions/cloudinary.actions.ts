import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(file: any) {
  try {
    const data = await cloudinary.uploader.upload(file, {
      upload_preset: "eh-egy",
      folder: "eh-egy",
    });
    return data;
  } catch (error) {
    console.log("🚀 ~ uploadFile ~ error:", error);
  }
}
