"use server";
import sharp from "sharp";

export const getFileMetadata = async (file: File) => {
  const arr = await file.arrayBuffer();
  const fileMetadata = await sharp(arr).metadata();
  return fileMetadata;
};
