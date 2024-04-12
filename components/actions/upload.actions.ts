"use server";
import { uploadFile } from "@/lib/actions/cloudinary.actions";

export const uploadImage = async (p: any, file: any) => {
  const response = await uploadFile(file);
  return response;
};
