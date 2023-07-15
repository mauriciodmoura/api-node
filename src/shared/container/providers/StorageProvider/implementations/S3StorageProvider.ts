import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../config/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const ContentType = mime.getType(originalName);
  
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${file}`,
      Body: fileContent,
      ContentType,
    };
  
    await this.client.send(new PutObjectCommand(uploadParams));
  
    await fs.promises.unlink(originalName);
  
    return file;
  }
  

  async delete(file: string, folder: string): Promise<void> {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${file}`,
    };
  
    await this.client.send(new DeleteObjectCommand(deleteParams));
  }
  
}

export { S3StorageProvider };